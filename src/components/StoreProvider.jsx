import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
  note:{
    id: ``,
    title: ``,
    done: false,
    categoryNote:``
  },
  listOfNotes: [],
  category:{
    categoryTitle: ``
  },
  listCategories:[]
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
