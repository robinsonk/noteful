import React, { Component } from 'react'
import Notes from './Components/Notes';
import NoteContext from '../NoteContext'
import Sidebar from './Components/Sidebar';

export default class MainPage extends Component {
    static contextType = NoteContext;

    render() {
        const { notes } = this.context
        return (
            <div>
                <nav>
                    <Sidebar/>
                </nav>
                <ul>
                    <Notes
                        notes={notes}
                    />
                </ul>
            </div>
        )
    }
}