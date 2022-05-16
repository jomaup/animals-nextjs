
import { ThunkAction } from "redux-thunk";
import { AppActions } from "../../models/actions";
import { RootState } from "../../rootStore";
import { Animal } from "./animal";

export const FETCH_ANIMAL_REQUEST = "FETCH_ANIMAL_REQUEST";
export const FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS";
export const FETCH_ANIMAL_FAILURE = "FETCH_ANIMAL_FAILURE";
export const CREATE_ANIMAL_REQUEST = "CREATE_ANIMAL_REQUEST";
export const CREATE_ANIMAL_SUCCESS = "CREATE_ANIMAL_SUCCESS";
export const CREATE_ANIMAL_FAILURE = "CREATE_ANIMAL_FAILURE";
export const DELETE_ANIMAL_REQUEST = "DELETE_ANIMAL_REQUEST";
export const DELETE_ANIMAL_SUCCESS = "DELETE_ANIMAL_SUCCESS";
export const DELETE_ANIMAL_FAILURE = "DELETE_ANIMAL_FAILURE";
export const UPDATE_ANIMAL_REQUEST = "UPDATE_ANIMAL_REQUEST";
export const UPDATE_ANIMAL_SUCCESS = "UPDATE_ANIMAL_SUCCESS";
export const UPDATE_ANIMAL_FAILURE = "UPDATE_ANIMAL_FAILURE";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AppActions>;

export interface GetAnimalAsync {
    loading: boolean;
    animals: Animal[];
    error: string;
}

export interface CreateAnimalAsync {
    loading: boolean;
    animal: Animal;
    error: string
}


export interface FetchAnimalsRequest extends GetAnimalAsync {
    type: typeof FETCH_ANIMAL_REQUEST,
}

export interface FetchAnimalsSuccess extends GetAnimalAsync {
    type: typeof FETCH_ANIMAL_SUCCESS,
}

export interface FetchAnimalsFailure extends GetAnimalAsync {
    type: typeof FETCH_ANIMAL_FAILURE,
}

export interface CreateAnimalRequest extends CreateAnimalAsync {
    type: typeof CREATE_ANIMAL_REQUEST,
}

export interface CreateAnimalSuccess extends CreateAnimalAsync {
    type: typeof CREATE_ANIMAL_SUCCESS,
}

export interface CreateAnimalFailure extends CreateAnimalAsync {
    type: typeof CREATE_ANIMAL_FAILURE,
}

export interface DeleteAnimalRequest {
    type: typeof DELETE_ANIMAL_REQUEST;
}

export interface DeleteAnimalSuccess {
    type: typeof DELETE_ANIMAL_SUCCESS;
    payload: string
}

export interface DeleteAnimalFailure {
    type: typeof DELETE_ANIMAL_FAILURE;
}

export interface EditAnimalRequest {
    type: typeof UPDATE_ANIMAL_REQUEST;
}


export interface EditAnimalSuccess {
    type: typeof UPDATE_ANIMAL_SUCCESS;
    payload: Animal
}

export interface EditAnimalFailure {
    type: typeof UPDATE_ANIMAL_FAILURE
}

export type AnimalActionType = FetchAnimalsRequest | FetchAnimalsSuccess | FetchAnimalsFailure | CreateAnimalRequest | CreateAnimalSuccess | CreateAnimalFailure | DeleteAnimalRequest | DeleteAnimalSuccess | DeleteAnimalFailure | EditAnimalRequest | EditAnimalSuccess | EditAnimalFailure;


