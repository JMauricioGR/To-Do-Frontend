function reducer(state, action){
  switch(action.type){
    case `get-categories`:
      const stateWithAllCategories ={
        ...state, 
        listCategories: action.payload
      }
      console.log(state.listCategories);
      return stateWithAllCategories
    case `get-notes`:
      const stateWithAllTheNotes = {
        ...state,
        listOfNotes: action.payload
      }
      console.log(state.listOfNotes);
      return stateWithAllTheNotes
    case `add-note`:
      const newNote = {
        todo: action.payload.todo,
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
      const newListOfNotes = state.listOfNotes.map(note => {
        if(note.id === action.payload.id){
          return action.payload
        }
        return note
      })
      const newStateModifiedCheckbox = {...state, listOfNotes: newListOfNotes}
      return newStateModifiedCheckbox
    case `add-category`:
      const newCategory = {
        id: Math.floor(Math.random()*100000),
        category: action.payload.category
      }
      const newListOfCategories = [...state.listCategories, newCategory]
      const newStateAddCategory = {
        ...state, listCategories: newListOfCategories
      }
      return newStateAddCategory
  }
}

export default reducer