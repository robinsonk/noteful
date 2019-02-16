import React, { Component } from 'react'
import './Sidebar.css'

class Sidebar extends Component {
    state = {
        color: ""
    };

    handleClick = () => {
       this.props.sortNotes(this.props.name, this.props.id);
    }

  

    render() {
        return (
            <button className="folderName"
                onClick={() => this.handleClick()}
            >
                {this.props.name}
            </button>
        );
    }
  }
  

  export default Sidebar;