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
            folderIdNew: '',
            folderName: '',
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

    updateNoteFolder(folderName) {
        this.setState({folderName});
    }

    updateNoteContent(content) {
        this.setState({content});
    }

    setFolder(event) {
        const folderName = this.state.folderName;
        const folderIdNew = this.state.folderIdNew;
        event.preventDefault();
        {this.props.folders.map((folder, i) => {
            if (folder.name === this.state.folderName) {
                this.setState({folderIdNew: folder.id}, function() {
                    this.handleSubmit(event);
                })
            }
        })}
        console.log(this.state.folderIdNew);  
    }

  

    handleSubmit(event) {
        const noteName  = this.state.noteName;
        const content = this.state.content;
        const folderName = this.state.folderName;
        const folderIdNew = this.state.folderIdNew;
        const newNoteInfo = {
            'name': noteName,
            'id': noteName,
            'date': new Date(),
            'content': content,
            folderId: folderIdNew
        }
        console.log('Name: ', noteName);

        console.log(`add folder called for ${noteName}`)

        console.log(`folder id new is ${folderIdNew}`)

        console.log(`folder name is ${folderName}`)

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
            this.context.notes.push(newNoteInfo)
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
                        <input type="text" name="note-name" onChange={(event) => this.updateNoteName(event.target.value)}/>
                        <br /><br />
                    <label htmlFor="content">Content: <br /></label>
                        <input type="text" name="content" onChange={(event) => this.updateNoteContent(event.target.value)}/>
                        <br /><br />
                    <label htmlFor="select">Select a folder: <br /></label>
                        <select name="select" onChange={(event) => this.updateNoteFolder(event.target.value)}>
                            {this.props.folders.map((folder, i) => 
                                <option value={folder.name} >{folder.name}</option>
                            )}
                        </select>
                    <br /><br />
                    <input type="submit" value="Submit" onClick={(event) => this.setFolder(event)}/>
                </form>
            </div>
        );
    }
  }
  

export default AddNote;