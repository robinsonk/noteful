import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Moment from 'react-moment';
import store from './store'
import './Folder.css'
import SidebarNotePage from './Components/SidebarNotePage'

function NotePage(props) {
    console.log(props.match);
    const note = store.notes.find(n =>
        n.id === props.match.params.noteId    
    )
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
                    <button className="remove">
                        Remove
                    </button>
                </li>
            </ul>
            
            {note.content.split(/\n \r|\n/).map((para, i) =>
                <p key={i} className="noteContent">
                    {para}
                </p>
            )}
        </div>
    );
}

export default NotePage;