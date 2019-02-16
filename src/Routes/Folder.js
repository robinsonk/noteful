import React, { Component } from 'react'
import store from './store'
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
                        <h3>{note.name}</h3> <br />
                        Modified: {note.modified} <br /><br />
                        <button className="remove">
                            Remove
                        </button>
                    </li>
                    )}
            </ul>
        </div>
    );
}
  
export default Folder;