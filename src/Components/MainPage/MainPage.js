import React, { Component } from 'react'
import Notes from '../Note/Notes';
import NoteContext from '../../NoteContext'
import Sidebar from '../Sidebars/Sidebar';
import './MainPage.css'


export default class MainPage extends Component {
    static contextType = NoteContext;

    render() {
        const { notes } = this.context;
        const { folders } = this.context;
        return (
            <div>
                <nav>
                    <Sidebar
                        folders={folders}
                    />
                </nav>
                <div className="notes-section">
                <ul>
                    <Notes
                        notes={notes}
                    />
                </ul>
                </div>
            </div>
        )
    }
}