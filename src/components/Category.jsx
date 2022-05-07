import React, { useContext, useState } from 'react'
import { Store } from './StoreProvider'

const Category = ({ onAdd }) => {

  const {state,dispatch} = useContext(Store)

  const [categoryTitle, setCategory] = useState('')

  const addCategory =(e) => {
    e.preventDefault()

    if (!categoryTitle){
      alert('Please add a category name')
      return
    }
    dispatch({
      type: `add-category`,
      payload: {
        categoryTitle,
      }
    })

    setCategory(e.target.value)

    onAdd({ categoryTitle })
      setCategory('')
    
  }

  return (
    <div>
      
      <label>Category: </label>
      <input type="text" placeholder='Category name' value={categoryTitle} onChange={(e) => setCategory(e.target.value)}></input>
      <button onClick={addCategory}>Add</button>

    </div>
  )
}

export default Category
