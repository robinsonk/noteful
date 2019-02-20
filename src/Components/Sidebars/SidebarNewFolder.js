import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

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
  
export default SidebarNewFolder;