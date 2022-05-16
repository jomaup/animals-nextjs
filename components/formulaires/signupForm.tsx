import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { userSignup } from "../../dto/user";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userSignup>();

  const [error] = useState(false);

  const formSubmitHandler: SubmitHandler<userSignup> = (data: userSignup) => {
    try {
      axios.post("https://animals-nestjs.herokuapp.com/user/signup", {
        username: data.username,
        password: data.password,
      });
      Router.push("/liste");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("different error than axios");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="champs">
          <h1>S'inscrire</h1>
          <br />
          <div className="inputbox">
            {errors.username && <span>Ce champ est vide</span>}
            <label>Username :</label>
            <input
              className="border-black border-2 rounded p-0.5"
              type="text"
              {...register("username", {
                required: true,
                minLength: {
                  value: 3,
                  message: "le username doit comporter au moins 3 caractères",
                },
              })}
            />
          </div>
          <br />
          <div className="inputbox">
            <label>Password: </label>
            <input
              className="border-black border-2 rounded p-0.5"
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message:
                    "Le mot de passe doit comporter 4 caractères au minimum",
                },
              })}
            />
          </div>
          <br />
          <input
            type="submit"
            className="border-black border-2 rounded p-0.5"
          />
        </div>
      </form>
    </>
  );
};
