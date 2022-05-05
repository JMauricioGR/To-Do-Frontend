import './App.css'
import Form from './components/Form'
import ListOfToDo from './components/ListOfToDo'
import StoreProvider from './components/StoreProvider'


function App() {
  

  return (
    <StoreProvider>
      <h1>Hello to all</h1>
      <Form />
      <ListOfToDo />
    </StoreProvider>
  )
}

export default App
