import React from 'react'

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
})

export default NoteContext