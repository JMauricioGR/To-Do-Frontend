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
      <label>Title:</label>
      <input onChange={addingTitle} type="text" name='todo'/>
      <button onClick={onAdd}>Add note</button>
    </form>
  )
}

export default Form
