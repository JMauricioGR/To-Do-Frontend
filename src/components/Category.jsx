import React, { useContext, useEffect, useRef, useState } from 'react'
import { Store } from './StoreProvider'

const Category = ({ onAdd }) => {

  const {state,dispatch} = useContext(Store)

  const [category, setCategory] = useState('')

  useEffect(() =>{
    let listOfCategories = fetchAllCategories().then(
      categories => {
        let action ={
          type: `get-categories`,
          payload: categories
        }
        dispatch(action)
      }
    )
  }, [])

  const fetchAllCategories = async()=>{
    let response = await fetch(`http://localhost:8081/api/v1/get/categories`)
    let data = await response.json()
    return data
  }

  const addCategory = async (e) => {
    e.preventDefault()

    if (!category){
      alert('Please add a category name')
      return
    }
    let CategoryToSend = {
      category: category
    }

    let categorySavedPromise = await fetch('http://localhost:8081/api/v1/save/category', 
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(CategoryToSend)
    })

    let categorySaved = await categorySavedPromise.json()


    dispatch({
      type: `add-category`,
      payload: categorySaved      
    })

    setCategory(e.target.value)

    onAdd({ category })
      setCategory('')
    console.log("categorySaved content" + JSON.stringify(categorySaved) + "State content" + JSON.stringify(state));
  }

  return (
    <div>
      
      <label>Category: </label>
      <input type="text" placeholder='Category name' value={category} onChange={(e) => setCategory(e.target.value)}></input>
      <button onClick={addCategory}>Add</button>

    </div>
  )
}

export default Category
