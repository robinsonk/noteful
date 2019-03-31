import React, { Component } from 'react'
import '../Folder/AddFolder.css'
import SidebarNewFolder from '../Sidebars/SidebarNewFolder'
import config from '../../config'
import NoteContext from '../../NoteContext';
import { Redirect } from 'react-router-dom'

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            noteName: '',
            noteId: '',
            modified: new Date(),
            content: '',
            folderId: '',
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

    updateNote(noteName) {
        this.setState({noteName}, () => {
            console.log(this.state.noteName, this.state.folderId, this.state.content)
        });
    }

    updateNoteFolder(folderId) {
        this.setState({folderId}, () => {
            console.log(this.state.noteName, this.state.folderId, this.state.content)
        });
    }

    updateNoteContent(content) {
        this.setState({content}, () => {
            console.log(this.state.noteName, this.state.folderId, this.state.content)
        });
    }

    setFolder(event) {
        // event.preventDefault();
        // {this.props.folders.map(folder => {
        //     if (folder.title === this.state.folderTitle) {
        //         this.setState({folderId: folder.id}, function() {
        //             this.handleSubmit(event);
        //         })
        //     }
        // })}
        console.log(this.state.folderId);  
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        }, () => {
            this.renderRedirect();
        })
        
    }

    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect exact to={`${config.API_ENDPOINT}/`} />
        }
    }
  

    handleSubmit(event) {
        event.preventDefault();
        const noteName  = this.state.noteName;
        const content = this.state.content;
        const folderId = this.state.folderId;
        const modified = this.state.modified;

        const newNoteInfo = {
            'title': noteName,
            'date_modified': modified,
            'folder': this.state.folderId,
            'content': this.state.content, 
        }
        console.log(newNoteInfo);

        fetch(`${config.API_ENDPOINT}/api/notes`, {
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
        .then(note => {
            this.context.notes.push(newNoteInfo)
            console.log(newNoteInfo)
        })
        .catch(error => {
            console.error(error)
        }) 
        this.setRedirect();
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
                        <input type="text" name="note-name" ref={this.nameInput} onChange={(event) => this.updateNote(event.target.value)}/>
                        <br /><br />
                    <label htmlFor="content">Content: <br /></label>
                        <input type="text" name="content" ref={this.nameInput} onChange={(event) => this.updateNoteContent(event.target.value)}/>
                        <br /><br />
                    <label htmlFor="select">Select a folder: <br /></label>
                        <select name="select" value={this.state.folderTitle} ref={this.nameInput} onChange={(event) => this.updateNoteFolder(event.target.value)}>
                        <option key={1} value="select one">Select one</option>
                            {this.props.folders.map((folder, i) => 
                                <option key={folder.id} value={folder.id}>{folder.title}</option>
                            )}
                        </select>
                    <br /><br />
                    <input type="submit" value="Submit" onClick={(event) => this.handleSubmit(event)}/>
                </form>
            </div>
        );
    }
  }
  

export default AddNote;