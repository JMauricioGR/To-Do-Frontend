import { useState } from 'react'
import './App.css'
import Category from './components/Category'
import Form from './components/Form'
import ListOfToDo from './components/ListOfToDo'
import StoreProvider from './components/StoreProvider'


function App() {
  const [catToDo, setCatToDo] = useState('')
  
  const addCategory = (category) =>{
    console.log(category);
    setCatToDo(category)
  }

  return (
    <StoreProvider>
      <h1>Dashboard</h1>
      <Category onAdd={addCategory}/>
      <Form />
      <ListOfToDo categoryOfToDo={catToDo}/>
    </StoreProvider>
  )
}

export default App
