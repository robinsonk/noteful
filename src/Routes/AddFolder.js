import React, { Component } from 'react'
import './AddFolder.css'
import SidebarNewFolder from './Components/SidebarNewFolder'

class AddFolder extends Component {

    render() {
        return (
            <div>
                <nav>
                    <SidebarNewFolder />
                </nav>
                <h2>Create new folder</h2>
                <form>
                    <label>
                        Folder name: <br />
                        <input type="text" name="name" />
                        <br />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
  }
  

export default AddFolder;