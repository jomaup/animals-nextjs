import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import {
  EditAnimalSuccess,
  UPDATE_ANIMAL_FAILURE,
  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
} from "../models/actions";
import { Animal } from "../models/animal";

const handleEditAnimalSuccess = (
  dispatch: Dispatch<EditAnimalSuccess>,
  editedAnimal: Animal
) => {
  dispatch({ type: UPDATE_ANIMAL_SUCCESS, payload: editedAnimal });
};

export const editAnimal =
  (editedAnimal: Animal) =>
  async (dispatch: any, { api }: any) => {
    dispatch({ type: UPDATE_ANIMAL_REQUEST });
    try {
      const res: AxiosResponse<Animal> = await axios.put(
        `https://animals-nest-js.herokuapp.com/animals/${editedAnimal.id}`,
        editedAnimal
      );
      handleEditAnimalSuccess(dispatch, res.data);
    } catch (e) {
      dispatch({ type: UPDATE_ANIMAL_FAILURE });
    }
  };
