import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'
import store from '../store.js'

class SidebarNewFolder extends Component {
    render() {
        return (
            <div>
                    <NavLink exact to={"/"}
                        className="folderName"
                        activeClassName="folderName-active"
                    >
                            BACK
                    </NavLink>  
            </div>
        );
    }
}
  
library.add(faFolderPlus)
export default SidebarNewFolder;