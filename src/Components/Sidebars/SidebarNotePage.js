import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import PropTypes from 'prop-types'

function SidebarNotePage(props) {
    const folder = props.folders.find(f =>
        f.id === props.id 
    )
    return (
        <div>
            <NavLink exact to={"/"}
                className="folderName"
                activeClassName="folderName-active"
            >
                BACK
            </NavLink>
            <span className="folderNameStatic">
                {folder.title}
            </span>  
            </div>
    );
}

SidebarNotePage.propTypes = {
    id: PropTypes.string.isRequired,
    folders: PropTypes.array.isRequired
}
export default SidebarNotePage;