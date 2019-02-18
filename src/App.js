import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import MainPage from './Routes/MainPage'
import Folder from './Routes/Folder'
import NoteContext from './NoteContext'
import NotePage from './Routes/NotePage'
import FolderNotePage from './Routes/FolderNotePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import AddFolder from './Routes/AddFolder'
import './App.css';
import config from './config'

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId  
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    console.log(config.API_ENDPOINT)
    Promise.all([
      fetch(`${config.API_ENDPOINT}/folders`),
      fetch(`${config.API_ENDPOINT}/notes`)
    ])
      .then(([foldersResponse, notesResponse]) => {
        if (!foldersResponse.ok)
          return foldersResponse.json().then(error => Promise.reject(error))
        if (!notesResponse.ok)
          return notesResponse.json().then(error => Promise.reject(error))

        return Promise.all([
          foldersResponse.json(),
          notesResponse.json(),
        ])
      })
      .then(([folders, notes]) => {
        this.setState({
          folders,
          notes
        })
      })
      .catch(error => {
        console.error({ error })
      })
  }


  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
    }

    return (
      <NoteContext.Provider value={contextValue}>
        <div className="App">
          <header role="banner">
            <h1>
              <Link to="/">
                Noteful 
              </Link>
              {' '}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main role="main">
            <Route
              exact path="/"
              component={MainPage}
            />
            <Route
              path="/folders/:folderId"
              render={(props) => <Folder {...props} notes={this.state.notes}/>}
            />
            <Route
              path="/notes/:noteId"
              render={(props) => <NotePage {...props} notes={this.state.notes}/>}
            />
            <Route
              path="/folder/notes/:noteId"
              render={(props) => <FolderNotePage {...props} notes={this.state.notes}/>}
            />
            <Route
              exact path="/add-folder"
              component={AddFolder}
            />
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
}

library.add(faCheckDouble)
export default App;
