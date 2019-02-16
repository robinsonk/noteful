import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './Sidebar.css'
import store from '../store.js'

class Sidebar extends Component {
    state = {
        color: ""
    };

    handleClick = () => {
       this.props.sortNotes(this.props.name, this.props.id);
    }

  

    render() {
        return (
            <div>
                {store.folders.map(folder =>
                    <Link to={`/folders/${folder.id}`}>
                        <button key={folder.id} className="folderName">
                            {folder.name}
                        </button>
                    </Link>  
                )}
            </div>
        );
    }
  }
  

  export default Sidebar;