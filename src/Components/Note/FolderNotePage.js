import React from 'react'
import config from '../../config'
import { NavLink } from 'react-router-dom'
import NoteContext from '../../NoteContext';
import Moment from 'react-moment';
import SidebarFolderNotePage from '../Sidebars/SidebarFolderNotePage'
import PropTypes from 'prop-types'

function FolderNotePage(props) {
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
                window.location.href = `/api/folders/${folderId}`;
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
                        const folderId = note.folder
                        if (note.id == props.match.params.noteId)
                        return ( 
                            <div key={note.id}> 
                                <nav>
                                    <SidebarFolderNotePage
                                        id={folderId}
                                        folders={props.folders}
                                    />
                                </nav>
                                <ul>
                                    <li key={note.id}>
                                        <h3>{note.title}</h3> <br />
                                        Modified <Moment format="Do MMM YYYY">{note.modified}</Moment> <br /><br />
                                        <button
                                            className="remove"
                                            onClick={(event) => {
                                                deleteNote(noteId, folderId)
                                            }}
                                        >
                                            <NavLink exact to={`/folders/${note.folderId}`}>
                                                Remove
                                            </NavLink>
                                        </button>
                                    </li>
                                </ul>
                            
                                {note.content.split(/\n \r|\n/).map((para, i) =>
                                    <p key={i} className="noteContent">
                                        {para}
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

FolderNotePage.propTypes = {
    notes: PropTypes.array.isRequired
}
export default FolderNotePage;