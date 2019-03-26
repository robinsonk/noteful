import React from 'react'
import { NavLink } from 'react-router-dom'
import NoteContext from '../../NoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'
import PropTypes from 'prop-types'

function Sidebar(props) {
        return (
            <NoteContext.Consumer>
            {(context) => (
            <div>
                {props.folders.map(folder =>
                    <NavLink exact to={`/api/folders/${folder.id}`}
                        className="folderName"
                        activeClassName="folderName-active"
                        key={folder.id}
                    >
                            {folder.title}
                    </NavLink>  
                )}
                    <NavLink exact to={"/add-folder"}>
                        <FontAwesomeIcon icon="folder-plus" className="folder-icon"/>
                    </NavLink>
            </div>
             )}
             </NoteContext.Consumer>
        );
}

Sidebar.propTypes = {
    folders: PropTypes.array.isRequired
}  
library.add(faFolderPlus)
export default Sidebar;