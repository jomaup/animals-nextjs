/* eslint-disable no-case-declarations */

import { Reducer } from "redux"
import { AppActions } from "../models/actions"
import {
  FETCH_ANIMAL_REQUEST,
  FETCH_ANIMAL_SUCCESS,
  FETCH_ANIMAL_FAILURE,
  CREATE_ANIMAL_REQUEST,
  CREATE_ANIMAL_SUCCESS,
  CREATE_ANIMAL_FAILURE,
  DELETE_ANIMAL_FAILURE,
  DELETE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_REQUEST,
} from "./models/actions"

import { Animal } from "./models/animal"

export interface AnimalsState {
  animals: Animal[]
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: AnimalsState = {
  animals: [],
  loading: false,
  error: null,
  success: false,
}

export const animalsReducer: Reducer<AnimalsState, AppActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_ANIMAL_REQUEST:
    case CREATE_ANIMAL_REQUEST:
    case UPDATE_ANIMAL_REQUEST:
      return { ...state, loading: true, success: false }
    case FETCH_ANIMAL_FAILURE:
    case CREATE_ANIMAL_FAILURE:
    case DELETE_ANIMAL_FAILURE:
      return { ...state, loading: false, success: false }
    case CREATE_ANIMAL_SUCCESS:
      return {
        ...state,
        animals: [...state.animals, action.animal],
        loading: false,
        success: true,
      }
    case FETCH_ANIMAL_SUCCESS:
      return {
        ...state,
        animals: [...action.animals],
        loading: false,
        success: true,
      }

    case DELETE_ANIMAL_SUCCESS:
      const deletedId = action.payload
      return {
        ...state,
        loading: false,
        success: true,
        animals: [...state.animals.filter((animal) => animal.id !== deletedId)],
      }

    default:
      return state
  }
}
