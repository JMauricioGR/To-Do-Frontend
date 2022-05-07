import React, { useContext, useEffect, useState } from 'react'
import { Store } from './StoreProvider'
import Form from './Form'

const ListOfToDo = () => {

  const {state, dispatch} = useContext(Store)

  useEffect(() =>{
    let listOfNote = fetchAllNotes().then(
      notes =>{
        let action = {
          type: `get-notes`,
          payload: notes
        }
        
        dispatch(action)
      }
    )
  }, [])

  const fetchAllNotes = async()=>{
    let response = await fetch('http://localhost:8081/api/v1/get/todos')
    let data = await response.json()
    return data
  }

  const onCheckbox = async(event, note) => {
    const checked = event.currentTarget.checked;

    let todoCheckUpdated = {...note, done: checked}

    let todoUpdatePromise = await fetch('http://localhost:8081/api/v1/update/todo', 
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(todoCheckUpdated)
      })

    let todoUpdated = await todoUpdatePromise.json()

    dispatch({
      type: `update-note`,
      payload: todoUpdated
    })
  }

  const onDelete = (note) => {
    dispatch({
      type: `remove-note`,
      payload: note
    })
  }

  const onEdit = (event, note) => {
    
    const titleToDo = event.todo;    

    dispatch({
      type: `update-note`,
      payload: {...note,
      todo: titleToDo}
    })
  }
  
  const [category, setCategory] = useState('')

  return (
    <>
    {state.listCategories.map(category => {
      return <div key={category.id}> 
      <h3 style={{display: 'inline-block'}}>Category: {category.categoryTitle}</h3>
      <button>Delete</button>
      <Form  category={category.categoryTitle}/>
      <ul>
        {state.listOfNotes.map(note => {
          return <li style={note.done?{textDecoration: 'line-through'}:{}} key={note.id}>
            {note.todo} 
            <input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} />
            <button onClick={() => onDelete(note)}>Delete</button>
            <button onClick={() => onEdit(note)}>Edit</button>
          </li>
        })}
      </ul>
      
    </div>
    })}
    </>    
  )
}

export default ListOfToDo
