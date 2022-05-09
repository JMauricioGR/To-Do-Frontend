function reducer(state, action){
  switch(action.type){
    case `get-categories`:
      const stateWithAllCategories ={
        ...state, 
        listCategories: action.payload
      }
      return stateWithAllCategories
    case `get-notes`:
      const stateWithAllTheNotes = {
        ...state,
        listOfNotes: action.payload
      }
      return stateWithAllTheNotes
    case `add-note`:
      const newNote = {
        todo: action.payload.todo,
        done: false,
        categoryid: action.payload.categoryid
      }
      const newListOfNotesAddesdOne = [...state.listOfNotes, newNote]
      const newStateAddNote = {
        ...state, listOfNotes: newListOfNotesAddesdOne
      }
      return newStateAddNote
    case `remove-category`:
      const newCategoryListWithoutPayloadCategory = state.listCategories.filter(category => category.id !== action.payload.id)
      const newStateWithCategoryDeleted = {...state, listCategories: newCategoryListWithoutPayloadCategory}
      return newStateWithCategoryDeleted
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
        id: action.payload.id,
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