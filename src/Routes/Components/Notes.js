import React, { Component } from 'react'
import './Notes.css'
import store from '../store'

class Notes extends Component {

    render() {
        return (
            <ul>
                {store.notes.map(note =>
                    <li key={note.id}>
                        <h3>{note.name}</h3> <br />
                        Modified: {note.modified} <br /><br />
                        <button className="remove">
                            Remove
                        </button>
                    </li>
                )}
            </ul>
        );
    }
  }
  

export default Notes;