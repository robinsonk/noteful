import React, { Component } from 'react'
import './AddFolder.css'
import SidebarNewFolder from './Components/SidebarNewFolder'
import config from '../config'
import NoteContext from '../NoteContext';
import Moment from 'moment'

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            noteName: '',
            noteId: '',
            modified: '',
            content: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultProps = {
        history: {
            push: () => {}
    
        },
    }

    static contextType = NoteContext;

    updateNoteName(noteName) {
        this.setState({noteName});
    }

    // updateNoteDate(modified) {
    //     this.setState({modified});
    // }

    updateNoteContent(content) {
        this.setState({content});
    }

    handleSubmit(event) {
        event.preventDefault();
        const noteName  = this.state.noteName;
        const content = this.state.content
        const newNoteInfo = {
            'name': noteName,
            'id': noteName,
            'date': new Date(),
            'content': content
        }
        console.log('Name: ', noteName);

        console.log(`add folder called for ${noteName}`)

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',  
            headers: {
                'content-type': 'application/json'
        },
        body: JSON.stringify(newNoteInfo),
    })
        .then(response => {
            if (!response.ok)
                return response.json().then(error => Promise.reject(error))
            return response.json()
        })
        .then(folder => {
            this.context.folders.push(newNoteInfo)
            // this.props.history.push(folder)
        })
        .catch(error => {
            console.error(error)
        })       
    }


    render() {
        return (
            <div>
                <nav>
                    <SidebarNewFolder />
                </nav>
                <h2>Create new note</h2>
                <form>
                    <label htmlFor="note-name">Note name: <br /></label>
                        <input type="text" name="note-name" />
                        <br /><br />
                        <label htmlFor="content">Content: <br /></label>
                        <input type="text" name="content" />
                        <br /><br />
                        <label htmlFor="select">Select a folder: <br /></label>
                        <select name="select">
                        {this.props.folders.map((folder, i) => 
                            <option value="folder a">{folder.name}</option>
                        )}
                        </select>
                    <br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
  }
  

export default AddNote;