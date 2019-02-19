import React, { Component } from 'react'
import './AddFolder.css'
import SidebarNewFolder from './Components/SidebarNewFolder'
import config from '../config'
import NoteContext from '../NoteContext';
import { Redirect } from 'react-router-dom'

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
            redirect: false
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
        this.setRedirect();
    }

    updateNoteContent(content) {
        this.setState({content});
    }

    setFolder(event) {
        event.preventDefault();
        {this.props.folders.map(folder => {
            if (folder.name === this.state.folderName) {
                this.setState({folderIdNew: folder.id}, function() {
                    this.handleSubmit(event);
                })
            }
        })}
        console.log(this.state.folderIdNew);  
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect exact to={`${config.API_ENDPOINT}/`} />
        }
    }
  

    handleSubmit(event) {
        const noteName  = this.state.noteName;
        const content = this.state.content;
        const folderIdNew = this.state.folderIdNew;

        const newNoteInfo = {
            'name': noteName,
            'id': noteName,
            'date': new Date(),
            'content': content,
            folderId: folderIdNew
        }

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
        .then(() => {
            this.context.notes.push(newNoteInfo)
        })
        .catch(error => {
            console.error(error)
        }) 
        window.location.href = "/"; 
    }


    render() {
        return (
            <div>
                <nav>
                    <SidebarNewFolder />
                </nav>
                <h2>Create a new note</h2>
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
                                <option key={folder.id} value={folder.name} >{folder.name}</option>
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