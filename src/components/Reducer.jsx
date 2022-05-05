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
      return state
    case `update-note`:
      return state
  }
}

export default reducer