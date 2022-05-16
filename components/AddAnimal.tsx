import Router from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid"
import { addAnimal } from "../store/animals/use-cases/create-animal.use-case";

export const AddAnimalForm = () => {

  interface IFormInputs {
      id: string
      name: string
      age: number
      type: string
      message: string
    }
    
    const { register, handleSubmit } = useForm<IFormInputs>()

    const dispatch = useDispatch()  

    const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
      data.id = uuidv4()
      dispatch(addAnimal(data) as any)
      Router.push("/liste")
    }
    
      return (
        <>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="champs">
              <h1>Ajouter son animal</h1>
              <br />
              <div className="inputbox">
                <label>Nom : </label>
                <input
                  className="border-black border-2 rounded p-0.5"
                  type="text"
                  {...register("name", {
                    required: true,
                    minLength: {
                      value: 3,
                      message:
                        "Le nom de votre animal doit comporter 3 caractères au minimum",
                    },
                  })}
                />
              </div>
              <br />
              <br />
              <div className="inputbox">
                <label>Age : </label>
                <input
                  className="border-black border-2 rounded p-0.5"
                  type="number"
                  {...register("age", {
                    required: true,
                    min: {
                      value: 0,
                      message:
                        "l'âge de votre animal ne peux pas etre inférieur à 0",
                    },
                  })}
                />
              </div>
              <br />
              <br />
              <div className="inputbox">
                <label>Espèce de l'animal :</label>
                <select className="border-black border-2 rounded p-0.5" {...register("type", { required: true })}>
                  <option value="chien" defaultValue="chien">
                    Chien
                  </option>
                  <option value="chèvre" defaultValue="chèvre">
                    Chèvre
                  </option>
                  <option value="chat" defaultValue="chat">
                    Chat
                  </option>
                </select>
              </div>
              <br />
              <br />
                <input type="submit" className="border-black border-2 rounded p-0.5" />
            </div>
          </form>
        </>
      )
}
