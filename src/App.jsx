import { useState } from 'react'
import './App.css'
import Category from './components/Category'
import Form from './components/Form'
import ListOfToDo from './components/ListOfToDo'
import StoreProvider from './components/StoreProvider'


function App() {
  const [catToDo, setCatToDo] = useState('')
  
  const addCategory = (category) =>{
    setCatToDo(category)
  }

  return (
    <StoreProvider className="container d-flex flex-wrap justify-content-center align-content-center">
      <h1>Dashboard</h1>
      <Category onAdd={addCategory} className="col-lg-7 col-md-10 col-sm-12 border" />     
      <ListOfToDo className="col-lg-7 col-md-10 col-sm-12" />
    </StoreProvider>
  )
}

export default App
