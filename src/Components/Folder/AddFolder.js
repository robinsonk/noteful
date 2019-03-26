import React, { Component } from 'react'
import './AddFolder.css'
import SidebarNewFolder from '../Sidebars/SidebarNewFolder'
import config from '../../config'
import NoteContext from '../../NoteContext';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.state = {
            folderName: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultProps = {
        history: {
            push: () => {}
    
        },
    }

    static contextType = NoteContext;

    updateFolderName(folderName) {
        this.setState({folderName});
    }

    handleSubmit(event) {
        event.preventDefault();
        const folder  = this.state.folderName;
        const newInfo = {
            'title': folder,
        }
        console.log('Name: ', folder);

        console.log(`add folder called for ${folder}`)

        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'POST',  
            headers: {
                'content-type': 'application/json'
        },
        body: JSON.stringify(newInfo),
    })
        .then(response => {
            if (!response.ok)
                return response.json().then(error => Promise.reject(error))
            return response.json()
        })
        .then(folder => {
            this.context.folders.push(newInfo)
            // this.props.history.push(folder)
        })
        .catch(error => {
            console.error(error)
        })  
        window.location.href = "/";      
    }

  

    render() {
        return (
            <div>
                <nav>
                    <SidebarNewFolder />
                </nav>
                <h2>Create new folder</h2>
                <form className="new-folder" onChange={(event) => this.updateFolderName(event.target.value)} >
                    <label>
                        Folder name: <br />
                        <input type="text" name="folderName" id="folderName" ref={this.nameInput} />
                        <br />
                    </label>
                    <button type="submit" value="Save Folder" onClick={(event) => this.handleSubmit(event)}>Save Folder</button>
                </form>
            </div>
        );
    }
  }
  

export default AddFolder;