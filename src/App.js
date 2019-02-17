import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import MainPage from './Routes/MainPage'
import Folder from './Routes/Folder'
import NotePage from './Routes/NotePage'
import FolderNotePage from './Routes/Components/FolderNotePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import AddFolder from './Routes/AddFolder'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header role="banner">
          <h1>
            <Link to="/"
            >
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
            component={Folder}
          />
          <Route
            path="/notes/:noteId"
            component={NotePage}
          />
          <Route
            path="/folder/notes/:noteId"
            component={FolderNotePage}
          />
          <Route
            exact path="/add-folder"
            component={AddFolder}
          />
        </main>
      </div>
    );
  }
}

library.add(faCheckDouble)
export default App;
