import axios, { Axios } from "axios"
import {
  DELETE_ANIMAL_FAILURE,
  DELETE_ANIMAL_REQUEST,
  DELETE_ANIMAL_SUCCESS,
  ThunkResult,
} from "../models/actions"

export const deleteAnimal =
  (deletedId: string) =>
  async (dispatch: any, { api }: any) => {
    dispatch({ type: DELETE_ANIMAL_REQUEST })
    try {
      await axios.delete(`http://localhost:5000/animals/${deletedId}`)
      dispatch({
        type: DELETE_ANIMAL_SUCCESS,
        payload: deletedId,
      })
    } catch (e) {
      dispatch({ type: DELETE_ANIMAL_FAILURE })
    }
  }
