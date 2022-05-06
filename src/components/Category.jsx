import React, { useState } from 'react'
import { Store } from './StoreProvider'
import ListOfToDo from './ListOfToDo'

const Category = ({ onAdd }) => {

  const [category, setCategory] = useState('')

  const addCategory =(e) => {
    e.preventDefault()

    if (!category){
      alert('Please add a category name')
      return
    }

    //
    onAdd({ category })
      setCategory('')
    
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
