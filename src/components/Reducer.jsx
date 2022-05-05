function reducer(state, action){
  switch(action.type){
    case `add-note`:
      const newNote = {
        id: Math.floor(Math.random() * 300),
        message: action.payload.message,
        title: action.payload.title,
        done: false
      }
      const newListOfNotesAddesdOne = [...state.listOfNotes, newNote]
      const newStateAddNote = {
        ...state, listOfNotes: newListOfNotesAddesdOne
      }
      return newStateAddNote
    case `remove-note`:
      const newListOfNotesWithoutPayloadNote = state.listOfNotes.filter(note => note.id !== action.payload.id)
      const newStateWithNoteDeleted = {...state, listOfNotes: newListOfNotesWithoutPayloadNote}
      return newStateWithNoteDeleted
    case `update-note`:
      const newListOfNotes = state.listOfNotes.filter(note => note.id !== action.payload.id)
      
      const newListOfNotesWhitModification = [...newListOfNotes, action.payload]
      const newStateModifiedCheckbox = {...state, listOfNotes: newListOfNotesWhitModification}
      return newStateModifiedCheckbox
  }
}

export default reducer