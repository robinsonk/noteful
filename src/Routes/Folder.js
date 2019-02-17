import React, { Component } from 'react'
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './Folder.css'
import Sidebar from './Components/Sidebar'

function Folder(props) {
    console.log(props.match);
    const note = store.notes.filter(n =>
        n.folderId === props.match.params.folderId    
    )
    return (
        <div>
            <nav>
                <Sidebar />
            </nav>
            <ul>
                {note.map(note => 
                    <li key={note.id}>
                        <NavLink exact to={`/folder/notes/${note.id}`}>
                            <h3>{note.name}</h3> <br />
                        </NavLink>
                        Modified <Moment format="Do MMM YYYY">{note.modified}</Moment> <br /><br />
                        <button className="remove">
                            Remove
                        </button>
                    </li>
                    )}
                    <NavLink exact to={"/add-folder"}>
                        <FontAwesomeIcon icon="plus-square" className="folder-icon"/>
                    </NavLink>
            </ul>
        </div>
    );
}

library.add(faPlusSquare)
export default Folder;