import React from 'react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './Folder.css'
import Sidebar from '../Sidebars/Sidebar'
import config from '../../config'
import NoteContext from '../../NoteContext';
import PropTypes from 'prop-types'

function Folder(props) {

    function deleteNote(noteId, event, folderId) {
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

    const note = props.notes.filter(note => note.folder == props.match.params.folderId)

    return (
        <div>
            <nav>
                <Sidebar 
                    folders={props.folders}
                />
            </nav>
            <NoteContext.Consumer>
                {(context) => (
                    <ul className="notes-section">
                        {note.map(note => {
                        const  noteId  = note.id
                        return (
                            <li key={note.id}>
                                <NavLink exact to={`/api/folder/notes/${note.id}`}>
                                    <h3 className="noteName">{note.title}</h3> <br />
                                </NavLink>
                                Modified <Moment format="Do MMM YYYY">{note.modified_date}</Moment> <br /><br />
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
                            <NavLink exact to={"/add-note"}>
                                <FontAwesomeIcon icon="plus-square" className="new-icon"/>
                            </NavLink>
                    </ul>
                )}
            </NoteContext.Consumer>
        </div>
    );
    
}

Folder.propTypes = {
    notes: PropTypes.array.isRequired,
    folders: PropTypes.array.isRequired
}

library.add(faPlusSquare)
export default Folder;