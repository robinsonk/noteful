import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Moment from 'react-moment';
import config from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './Notes.css'
import NoteContext from '../../NoteContext';
import PropTypes from 'prop-types'



export default function Notes(props) {
    
    function deleteNote(noteId, event) {
        console.log(`delete called for ${noteId}`)

        fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
            method: 'DELETE',  
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok)
                return response.json().then(error => Promise.reject(error))
            window.location.reload();
        })
        .catch(error => {
            console.error(error)
        })
        
       
    }


    return (
        <NoteContext.Consumer>
            {(context) => (
                <ul>
                    {props.notes.map(note => {
                    const  noteId  = note.id
                    return (
                        <li key={note.id}>
                            <Link to={`/api/notes/${note.id}`}
                                className="noteName"
                            >
                                <h3>{note.title}</h3> <br />
                            </Link>
                            Modified <Moment format="Do MMM YYYY">{note.modified}</Moment> <br /><br />
                            <button 
                                className="remove"
                                onClick={(event) => {
                                    deleteNote(noteId, event)
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    )
                    })}
                    <NavLink exact to={"/add-note"}>
                        <FontAwesomeIcon icon="plus-square" className="new-icon"/>
                    </NavLink>
                </ul>
            )}
        </NoteContext.Consumer>
    );
}

Notes.propTypes = {
    notes: PropTypes.array.isRequired
}
  
library.add(faPlusSquare)