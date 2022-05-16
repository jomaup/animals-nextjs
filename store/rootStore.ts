import { configureStore } from '@reduxjs/toolkit';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux"
import { AnimalsState, animalsReducer } from "./animals/animalReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { AnimalActionType } from "./animals/models/actions"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import reduxThunk from "redux-thunk"
import thunkMiddleware from 'redux-thunk'

const id = uuidv4()

export interface RootState {
  readonly animals: AnimalsState
}

export type RootAction = AnimalActionType

export const rootReducer = combineReducers({ animalsReducer })

export type AppState = ReturnType<typeof rootReducer>

export const initStore = (initialState: any) => {
  return createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware)
    )
  )
}


  
  

