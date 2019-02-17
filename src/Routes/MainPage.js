import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Notes from './Components/Notes';
import Sidebar from './Components/Sidebar';
import store from './store.js'
import AddFolder from './AddFolder'

export default class MainPage extends Component {
    render() {
        return (
            <div>
                <nav>
                    <Sidebar/>
                </nav>
                <ul>
                    <Notes/>
                </ul>
            </div>
        )
    }
}