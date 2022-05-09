import React, { useContext, useState, useRef } from 'react'
import { Store } from './StoreProvider';

const Form = ({ category }) => {

  const formRef = useRef(null)

  
  const onAdd = async (event) => {
    event.preventDefault();
    if(todo){
      const noteFromForm = {
        todo,
        done: false,
        categoryid: category
        
      }
      console.log(noteFromForm);
      let noteSavedPromise = await fetch('http://localhost:8081/api/v1/save/todo', 
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(noteFromForm)
      })

      let noteSaved = await noteSavedPromise.json();

      dispatch({
        type: `add-note`,
        payload: noteSaved
      })

      formRef.current.reset();
    }
  }

  const {state, dispatch} = useContext(Store)

  const [todo, setTodo] = useState('')

  const addingTitle = (e) => {
    setTodo(e.target.value)
  }
  

  return (
    <form ref={formRef}>
      <label className=" font-weight-normal col-sm-2 col-form-label">To do: </label>
      <input onChange={addingTitle} type="text" name='todo' className="form-control" />
      <button onClick={onAdd} className="btn btn-primary m-2">Add note</button>
    </form>
  )
}

export default Form
