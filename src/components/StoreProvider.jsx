import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
  note:{
    id: ``,
    title: ``,
    message: ``,
    done: false,
    category:``
  },
  listOfNotes: [
    {
      id: `0`,
      title: `Title by default`,
      message: `Message by default`,
      done: true,
      category: `Category by default`
    }
  ]
}

const Store = createContext(initialState)

const StoreProvider = ( { children } ) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Store.Provider value={{state, dispatch}}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider

export {Store, initialState}
