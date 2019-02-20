import React from 'react'
import { NavLink } from 'react-router-dom'
import config from '../../config'
import NoteContext from '../../NoteContext';
import Moment from 'react-moment';
import '../Folder/Folder.css'
import './NotesPage.css'
import SidebarNotePage from '../Sidebars/SidebarNotePage'
import PropTypes from 'prop-types'

function NotePage(props) {

    function deleteNote(noteId) {
        window.location.reload();
        console.log(`delete called for ${noteId}`)

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',  
            headers: {
                'content-type': 'application/json'
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
                            <div key={note.id}>
                                <nav>
                                    <SidebarNotePage
                                        id={note.folderId}
                                        folders={props.folders}
                                    />
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
                              return '';
                            })
                        )}
                    </NoteContext.Consumer>
        </div>
    );
}

NotePage.propTypes = {
    notes: PropTypes.array.isRequired
}
export default NotePage;