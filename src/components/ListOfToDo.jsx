import React, { useContext } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = ({ categoryOfToDo }) => {

  const {state, dispatch} = useContext(Store)

  const onCheckbox = (event, note) => {
    const checked = event.currentTarget.checked;

    dispatch({
      type: `update-note`,
      payload: {...note,
      done:checked}
    })
  }

  const onDelete = (note) => {
    dispatch({
      type: `remove-note`,
      payload: note
    })
  }

  return (
    <div>
      <h1>Category: {categoryOfToDo}</h1>
      <ul>
        {state.listOfNotes.map(note => {
          return <li style={note.done?{textDecoration: 'line-through'}:{}} key={note.id}>
            {note.title} <br />
            {note.message} <br />
            <input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} />
            <button onClick={() => onDelete(note)}>Delete</button>
          </li>
        })}
      </ul>
      
    </div>
  )
}

export default ListOfToDo
