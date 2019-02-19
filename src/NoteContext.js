import React from 'react'

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addNote: () => {},
    addNewFolder: () => {},
})

export default NoteContext