import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import store from '../store.js'

function SidebarFolderNotePage(props) {
    console.log("sidebar folder notes page is working")
    const folder = store.folders.find(f =>
        f.id === props.children 
    )
    return (
        <div>
            <NavLink exact to={`/folders/${folder.id}`}
                className="folderName"
                activeClassName="folderName-active"
            >
                BACK
            </NavLink>
            <span className="folderNameStatic">
                {folder.name}
            </span>  
            </div>
    );
}
  
export default SidebarFolderNotePage;