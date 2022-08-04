import {
  FetchAnimalsSuccess,
  FETCH_ANIMAL_REQUEST,
  FETCH_ANIMAL_SUCCESS,
  FETCH_ANIMAL_FAILURE,
} from "../models/actions";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Animal } from "../models/animal";
import { Dispatch } from "redux";

export const handleFetchAnimalsSuccess = (
  dispatch: Dispatch<FetchAnimalsSuccess>,
  res: Animal[]
) => {
  dispatch({
    type: FETCH_ANIMAL_SUCCESS,
    animals: res,
    error: "",
    loading: false,
  });
};

export const fetchAnimals: any =
  () =>
  async (dispatch: any, { api }: any): Promise<any> => {
    try {
      dispatch({
        type: FETCH_ANIMAL_REQUEST,
        loading: true,
        error: "",
        animals: [],
      });
      const res: AxiosResponse<Animal[]> = await axios.get(
        "http://localhost:5000/animals",
        {
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user") || "").accessToken
            }`,
          },
        }
      );

      handleFetchAnimalsSuccess(dispatch, res.data);
    } catch (e) {
      dispatch({
        type: FETCH_ANIMAL_FAILURE,
        loading: false,
        error: "impossible d'afficher",
        animals: [],
      });
    }
  };
