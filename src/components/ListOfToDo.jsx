import React, { useContext, useEffect, useState } from 'react'
import { Store } from './StoreProvider'
import Form from './Form'


const ListOfToDo = () => {



  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    let listOfNote = fetchAllNotes().then(
      notes => {
        let action = {
          type: `get-notes`,
          payload: notes
        }

        dispatch(action)
      }
    )

  }, [])

  const fetchAllNotes = async () => {
    let response = await fetch('http://localhost:8081/api/v1/get/todos')
    let data = await response.json()
    return data
  }


  const onDelete = async (note) => {
    console.log(note.id)
    let response = await fetch(`http://localhost:8081/api/v1/delete/todo/${note.id}`,
      {
        method: 'DELETE',
      })

    console.log(response)

    if (response.status === 200) {
      dispatch({
        type: `remove-note`,
        payload: note
      })
    }
  }

  const onCatDelete = async (categoryDelete) => {
    let response = await fetch(`http://localhost:8081/api/v1/delete/category/${categoryDelete.id}`,
      {
        method: `DELETE`,
      })

    if (response.status === 200) {
      dispatch({
        type: `remove-category`,
        payload: categoryDelete
      })
    }

  }

  const onEdit = (event) => {
    setTodo(event)
    const inputUpdate = document.querySelector(`#inp-edit-${event.categoryid.id}`)
    const divToHide = document.querySelector(`#div-${event.categoryid.id}`)
    const titleToDo = event.todo
    inputUpdate.value = titleToDo
    divToHide.style.display = 'block'

  }

  const onCheckbox = async (event, note) => {
    const checked = event.currentTarget.checked;

    let todoCheckUpdated = { ...note, done: checked }

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
  const [todo, setTodo] = useState('')

  const onUpdateNote = async (todo) => {
    if (!todo) {
      alert("Select one to do for edit")
    }
    const inputUpdate = document.querySelector(`#inp-edit-${todo.categoryid.id}`)
    const divToHide = document.querySelector(`#div-${todo.categoryid.id}`)
    console.log("TASK SELECTED: " + JSON.stringify(todo));
    const todoEdit = inputUpdate.value
    let todoTextToUpdate = { ...todo, todo: todoEdit }
    let todoUpdateTextPromise = await fetch(`http://localhost:8081/api/v1/update/todo`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(todoTextToUpdate)
      })

    let todoTextUpdated = await todoUpdateTextPromise.json()

    dispatch({
      type: `update-note`,
      payload: todoTextUpdated
    })

    inputUpdate.value = ''
    divToHide.style.display = 'none'

  }



  return (
    <>
      {state.listCategories.map(category => {

        return <div key={category.id}>
          <h3 style={{ display: 'inline-block' }}>Category: {category.category}</h3>
          <button onClick={() => onCatDelete(category)} className="btn btn-primary m-2">Delete</button>
          <Form category={category.id} />
          <div style={{display: 'none'}} id={`div-${category.id}`}>
            <label>Text to uptade </label>
            <input id={`inp-edit-${category.id}`} className="form-control"></input>
            <button onClick={(event) => onUpdateNote(todo) } className="btn btn-primary m-2">Update</button>
          </div>
          <ul className="list-unstyled">
            {state.listOfNotes.map(note => {
              if (note.categoryid.id === category.id) {
                return <li style={note.done ? { textDecoration: 'line-through' } : {}} key={note.id} className="m-2">
                  {note.todo}
                  <input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} className="m-2" />
                  <button onClick={() => onDelete(note)} className="btn btn-primary m-2">Delete</button>
                  <button onClick={() => onEdit(note)} className="btn btn-primary m-2">Edit</button>
                </li>
              }
            })}
          </ul>
        </div>
      })}
    </>
  )
}

export default ListOfToDo
