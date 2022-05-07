import React, { useContext } from 'react'
import { Store } from './StoreProvider'
import Form from './Form'

const ListOfToDo = () => {

  const {state, dispatch} = useContext(Store)

  useEffect(() =>{
    let listOfNote = fectchAllNotes().then(
      notes =>{
        let action = {
          type: `get-notes`,
          payload: notes
        }

        dispatch(action)
      }
    )
  },[])

  const fectchAllNotes = async()=>{
    let response = await fetch('http://localhost:8081/api/v1/get/todos')
    let data = await response.json()
    return data
  }

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
    <>
    {state.listCategories.map(category => {
      console.log(category);
      return <div key={category.id}> 
      <h3 style={{display: 'inline-block'}}>Category: {category.categoryTitle}</h3>
      <button>Delete</button>
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
    })}
    </>    
  )
}

export default ListOfToDo
