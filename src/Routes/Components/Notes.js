import React, { Component } from 'react'
import './Notes.css'

class Notes extends Component {

    render() {
        return (
            this.props.notes.map((key, index) =>
                <li>
                    <h3>{this.props.notes[index].name}</h3> <br />
                    Modified: {this.props.notes[index].modified} <br /><br />
                    <button className="remove">Remove</button>
                </li>
            )
        );
    }
  }
  

  export default Notes;