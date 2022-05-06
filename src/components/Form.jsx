import React, { useContext, useState, useRef } from 'react'
import { Store } from './StoreProvider';

const Form = () => {

  const formRef = useRef(null)

  const onAdd = (event) => {
    event.preventDefault();
    if(title){
      dispatch({
        type: `add-note`,
        payload: {
          title,
        }
      })

      formRef.current.reset();
    }
  }

  const {state, dispatch} = useContext(Store)

  const [title, setTitle] = useState('')

  const [message, setMessage] = useState('')

  const addingTitle = (e) => {
    setTitle(e.target.value)
  }
  

  return (
    <form ref={formRef}>
      <label>Title:</label>
      <input onChange={addingTitle} type="text" name='title'/>
      <button onClick={onAdd}>Add note</button>
    </form>
  )
}

export default Form
