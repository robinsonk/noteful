import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import config from '../config'
import NoteContext from '../NoteContext';
import Moment from 'react-moment';
import './Folder.css'
import SidebarNotePage from './Components/SidebarNotePage'

function NotePage(props) {

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


    return (
        <div>
            <NoteContext.Consumer>
                {(context) => (
                    props.notes.map(note => {
                        const noteId = note.id
                        if (note.id === props.match.params.noteId)
                        return ( 
                            <div>
                                <nav>
                                    <SidebarNotePage>
                                        {note.folderId}
                                    </SidebarNotePage>
                                </nav>
                                <ul>
                                    <li key={note.id}>
                                        <h3>{note.name}</h3> <br />
                                        Modified <Moment format="Do MMM YYYY">{note.modified}</Moment> <br /><br />
                                        <button 
                                            className="remove"
                                            onClick={(event) => {
                                                deleteNote(noteId)
                                            }}
                                        >
                                            <NavLink exact to={`/`}>
                                                Remove
                                            </NavLink>
                                        </button>
                                    </li>
                                </ul>
                                
                                {note.content.split(/\n \r|\n/).map((p, i) =>
                                    <p key={i} className="noteContent">
                                        {p}
                                    </p>
                                )}
                            </div>
                              )
                            })
                        )}
                    </NoteContext.Consumer>
        </div>
    );
}

export default NotePage;