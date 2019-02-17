import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'
import store from '../store.js'

class Sidebar extends Component {
    render() {
        return (
            <div>
                {store.folders.map(folder =>
                    <NavLink exact to={`/folders/${folder.id}`}
                        className="folderName"
                        activeClassName="folderName-active"
                        key={folder.id}
                    >
                            {folder.name}
                    </NavLink>  
                )}
                    <NavLink exact to={"/add-folder"}>
                        <FontAwesomeIcon icon="folder-plus" className="folder-icon"/>
                    </NavLink>
            </div>
        );
    }
}
  
library.add(faFolderPlus)
export default Sidebar;