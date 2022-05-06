import React, { useContext } from 'react'
import { Store } from './StoreProvider'
import Form from './Form'

const ListOfToDo = () => {

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

  const onEdit = (event, note) => {
    console.log(event, '--- El note es: ', note);
    const titleToDo = event.title;
    console.log(titleToDo);

    dispatch({
      type: `update-note`,
      payload: {...note,
      title:titleToDo}
    })
  }

  return (
    <div>
      <h3>Category: </h3>
      <Form />
      <ul>
        {state.listOfNotes.map(note => {
          return <li style={note.done?{textDecoration: 'line-through'}:{}} key={note.id}>
            {note.title} <br />
            <input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} />
            <button onClick={() => onDelete(note)}>Delete</button>
            <button onClick={() => onEdit(note)}>Edit</button>
          </li>
        })}
      </ul>
      
    </div>
  )
}

export default ListOfToDo
