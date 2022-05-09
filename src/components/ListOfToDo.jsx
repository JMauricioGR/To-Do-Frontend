import React, { useContext, useEffect, useState } from 'react'
import { Store } from './StoreProvider'
import Form from './Form'
import Category from './Category'

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

  const onDelete = async (note) => {
    let response = await fetch(`http://localhost:8081/api/v1/delete/todo/${note.id}`, 
    {
      method: 'DELETE',
    })

    if(response.status === 200){
      dispatch({
        type: `remove-note`,
        payload: note
      })
    }    
  }
  
  const onCatDelete = async (categoryDelete)=>{
    let response = await fetch(`http://localhost:8081/api/v1/delete/category/${categoryDelete.id}`,
    {
      method: `DELETE`,
    })

    if(response.status === 200){
      dispatch({
        type: `remove-category`,
        payload: categoryDelete
      })
    }    
    
  }
  const [categoryid, setCategoryid] = useState('')
  const inputUpdate = document.querySelector(`inp-edit-${categoryid}`)
  
  const onEdit = (event, note) => {
    // event.preventDefault();
    //lert("here onedit")
    console.log(event.todo)
    // setCategoryid(category.id)
    const titleToDo = event.todo;    
    inputUpdate.value(titleToDo)

    // dispatch({
    //   type: `update-note`,
    //   payload: {...note,
    //   todo: titleToDo}
    // })
  }


  return (
    <>
    {state.listCategories.map(category => {
      
      return <div key={category.id}> 
      <h3 style={{display: 'inline-block'}}>Category: {category.category}</h3>
      <button onClick={()=> onCatDelete(category)}>Delete</button>
      <Form  category={category.id}/>
      <div /*style={{display: 'none'}}*/>
        <input  id={`inp-edit-${category.id}`} value={""}></input>
        <button>Update</button>
      </div>
      <ul>
        {state.listOfNotes.map(note => {
          if(note.categoryid.id === category.id){
            return <li style={note.done?{textDecoration: 'line-through'}:{}} key={note.id}>
            {note.todo} 
            <input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} />
            <button onClick={() => onDelete(note)}>Delete</button>
            <button onClick={() => onEdit(note)}>Edit</button>
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
