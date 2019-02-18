import React, { Component } from 'react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './Folder.css'
import Sidebar from './Components/Sidebar'
import config from '../config'
import NoteContext from '../NoteContext';

function Folder(props) {

    function deleteNote(noteId) {
        window.location.reload();
        console.log(`delete called for ${noteId}`)

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',  
            headers: {
                'content-type': 'NoteContext'
        },
    })
        .then(response => {
            if (!response.ok)
                return response.json().then(error => Promise.reject(error))
            return response.json()
        })
        .catch(error => {
            console.error(error)
        })
       
    }

    console.log(props.match);
    const note = props.notes.filter(n =>
        n.folderId === props.match.params.folderId    
    )
    return (
        <div>
            <nav>
                <Sidebar />
            </nav>
            <NoteContext.Consumer>
                {(context) => (
                    <ul>
                        {note.map(note => {
                        const  noteId  = note.id
                        return (
                            <li key={note.id}>
                                <NavLink exact to={`/folder/notes/${note.id}`}>
                                    <h3>{note.name}</h3> <br />
                                </NavLink>
                                Modified <Moment format="Do MMM YYYY">{note.modified}</Moment> <br /><br />
                                <button 
                                    className="remove"
                                    onClick={(event) => {
                                        deleteNote(noteId)
                                    }}
                                >
                                    Remove
                                </button>
                            </li>
                        )
                            })}
                            <NavLink exact to={"/add-folder"}>
                                <FontAwesomeIcon icon="plus-square" className="folder-icon"/>
                            </NavLink>
                    </ul>
                )}
            </NoteContext.Consumer>
        </div>
    );
}

library.add(faPlusSquare)
export default Folder;