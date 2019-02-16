import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import store from './store'
import MainPage from './Routes/MainPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {
    
  
  render() {
    return (
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
            path="/"
            component={MainPage}
          />
        </main>
      </div>
    );
  }
}

library.add(faCheckDouble)
export default App;
