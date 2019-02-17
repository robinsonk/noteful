import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './Notes.css'
import store from '../store'

class Notes extends Component {

    render() {
        const dateToFormat = null;
        return (
            <ul>
                {store.notes.map(note =>
                    <li key={note.id}>
                        <Link to={`notes/${note.id}`}
                            className="noteName"
                        >
                            <h3>{note.name}</h3> <br />
                        </Link>
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
        );
    }
}
  
library.add(faPlusSquare)
export default Notes;