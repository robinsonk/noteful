import React, { Component } from 'react'
import Notes from './Components/Notes';
import Sidebar from './Components/Sidebar';
import store from './store.js'

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        
        // this.sortNotes = this.sortNotes.bind(this);
        // this.newNotes = this.newNotes.bind(this);
    }

    // componentDidMount() {
    //     this.setState({selectedNotes: this.state.notes});
    // }

    // sortNotes(name, id) {
    //     const selectedNotesArr = [];
    //     this.state.notes.map((key, index) => {
    //         if (this.state.notes[index].folderId === id) {
    //             selectedNotesArr.push(this.state.notes[index])
    //         }
    //         return selectedNotesArr;
    //     })
    //     this.newNotes(selectedNotesArr);
    // }

    // newNotes(selectedNotesArr) {
    //     console.log('newNotes function has ran');
    //     if (this.state.sorted === null) {
    //         this.setState({selectedNotes: this.state.notes})
    //     }
    //     this.setState({selectedNotes: selectedNotesArr}, function() {
    //        console.log(this.state.selectedNotes);
    //     });
    // }


    render() {
        return (
            <div>
                <nav>
                        <Sidebar/>
                </nav>
                <ul>
                        <Notes/>
                </ul>
            </div>
        )
    }
}