import React, { Component } from 'react'
import './Sidebar.css'

class Sidebar extends Component {
    state = {
        color: ""
    };

    onToggle = (event) => {
        event.target.classList.toggle("buttonSelected");
    }

  

    render() {
        return (
            this.props.folders.map((key, index) =>
                <button className="folderName"
                    onClick={() => this.onToggle()}
                >
                   {this.props.folders[index].name}
                </button>
            )
        );
    }
  }
  

  export default Sidebar;