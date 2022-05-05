import React, { createContext, useReducer } from 'react'

const initialState = {
  note:{
    id: ``,
    title: ``,
    message: ``,
    done: false
  },
  listOfNotes: [
    {
      id: `0`,
      title: `Title by default`,
      message: `Message by default`,
      done: true
    }
  ]
}

const Store = createContext(initialState)

const StoreProvider = ( { children } ) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Store.Provider vlaue={{state, dispatch}}>
      {children}
    </Store.Provider>
  )
}

export default StoreProvider
