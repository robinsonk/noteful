import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import Folder from '../Folder/Folder'
import NoteContext from '../../NoteContext'
import NotePage from '../Note/NotePage'
import FolderNotePage from '../Note/FolderNotePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import AddFolder from '../Folder/AddFolder'
import AddNote from '../Note/AddNote'
import './App.css';
import config from '../../config'
import ErrorBoundary from './ErrorBoundary'

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
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/folders`),
      fetch(`${config.API_ENDPOINT}/api/notes`)
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
      addFolder: this.addNewFolder,
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
            <ErrorBoundary>
              <Route
                exact path="/"
                component={MainPage}
              />
              <Route
                path="/api/folders/:folderId"
                render={(props) => <Folder {...props} notes={this.state.notes} folders={this.state.folders} folderId={this.state.folders.map(f => f.id)} noteFolderId={this.state.folders.map(n => n.folder)}/>}
              />
              <Route
                path="/api/notes/:noteId"
                render={(props) => <NotePage {...props} notes={this.state.notes} folders={this.state.folders}/>}
              />
              <Route
                path="/api/folder/notes/:noteId"
                render={(props) => <FolderNotePage {...props} notes={this.state.notes} folders={this.state.folders}/>}
              />
              <Route
                exact path="/add-folder"
                render={(props) => <AddFolder {...props} addNewFolder={this.state.addNewfolder} folders={this.state.folders}/>}
              />
              <Route
                exact path="/add-note"
                render={(props) => <AddNote {...props} addNote={this.state.addNote} folders={this.state.folders} notes={this.state.notes}/>}
              />
            </ErrorBoundary>
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
}

library.add(faCheckDouble)
export default App;
