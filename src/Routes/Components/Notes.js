import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Moment from 'react-moment';
import config from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './Notes.css'
import NoteContext from '../../NoteContext';

function deleteNote(props, callback, id) {
    const noteId = this.props.id
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
        method: 'DELETE',  
        headers: {
            'content-type': 'NoteContext'
        },
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw error
                })
            }
            return response.json()
        })
        .then(data => {
            callback(noteId)
        })
        .catch(error => {
            console.error(error)
        })
}

export default function Notes(props) {

    function deleteNote(noteId) {
        console.log(`delete called for ${noteId}`)
    }

    return (
        <NoteContext.Consumer>
            {(context) => (
                <ul>
                    {props.notes.map(note => {
                    const  noteId  = note.id
                    return (
                        <li key={note.id}>
                            <Link to={`notes/${note.id}`}
                                className="noteName"
                            >
                                <h3>{note.name}</h3> <br />
                            </Link>
                            Modified <Moment format="Do MMM YYYY">{note.modified}</Moment> <br /><br />
                            <button 
                                className="remove"
                                onClick={() => {
                                    deleteNote(
                                        noteId,
                                        context.deleteNote,
                                    )
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
    );
}
  
library.add(faPlusSquare)