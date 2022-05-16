import axios, { AxiosResponse } from "axios"
import { Dispatch } from "redux"
import {
  CreateAnimalSuccess,
  CREATE_ANIMAL_FAILURE,
  CREATE_ANIMAL_REQUEST,
  CREATE_ANIMAL_SUCCESS,
} from "../models/actions"
import { Animal } from "../models/animal"

const handleAddAnimalSuccess = (
  dispatch: Dispatch<CreateAnimalSuccess>,
  res: Animal
) => {
  dispatch({
    type: CREATE_ANIMAL_SUCCESS,
    loading: false,
    error: "",
    animal: res,
  })
}

export const addAnimal =
  (animal: Animal) =>
  async (dispatch: Dispatch, { api }: any) => {
    dispatch({
      type: CREATE_ANIMAL_REQUEST,
      loading: true,
      error: "",
      animal: { id: "", age: 0, type: "", name: "" },
    })
    try {
      const res: AxiosResponse<Animal> = await axios.post(
        "http://localhost:5000/animals",
        animal
      )
      handleAddAnimalSuccess(dispatch, res.data)
    } catch (e) {
      dispatch({
        type: CREATE_ANIMAL_FAILURE,
        loading: false,
        error: "Impossible d'ajouter",
        animal: { id: "", age: 0, type: "", name: "" },
      })
    }
  }
