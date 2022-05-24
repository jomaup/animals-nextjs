import axios, { AxiosRequestConfig } from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimalsState } from "../../store/animals/animalReducer";
import { Animal } from "../../store/animals/models/animal";
import { deleteAnimal } from "../../store/animals/use-cases/delete-animal.use-case";
import { fetchAnimals } from "../../store/animals/use-cases/get-animals.use-case";
import { AppState } from "../../store/rootStore";
import jwt_decode from "jwt-decode";

const axiosInstance = axios.create();

const Index = () => {
  const dispatch = useDispatch();

  type Token = {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };

  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig<String>) => {
      const token = JSON.parse(localStorage.getItem("token") || "{}");
      config.headers!["authorization"] = token?.accessToken
        ? `Bearer ${token.accessToken}`
        : "";

      const currentDate = new Date();
      if (token) {
        const decodedToken: any = jwt_decode(token?.accessToken || "");

        if (decodedToken.exp! * 1000 < currentDate.getTime()) {
          const data = await getRefreshToken();
          config.headers!["authorization"] = "Bearer " + data.accessToken;
          localStorage.setItem(
            "token",
            JSON.stringify({
              refreshToken: token?.refreshToken || null,
              accessToken: data.accessToken,
            })
          );
        }
      }

      return config;
    }
  );

  const getRefreshToken = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    try {
      const res = await axios.post(
        "https://animals-nest-js.herokuapp.com/auth/refresh",
        {
          token: token?.refreshToken || null,
        }
      );
      return res.data;
    } catch (err) {
      return "false";
    }
  };

  useEffect(() => {
    dispatch(fetchAnimals());
  }, []);

  const animals = useSelector<AppState, AnimalsState>(
    (state) => state.animalsReducer
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Router.push("/add-animal");
  };

  const onDelete = async (id: string) => {
    dispatch(deleteAnimal(id) as any);
    dispatch(fetchAnimals());
  };

  return (
    <>
      <div className="title">Liste des animaux</div>
      <div className="liste">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">nom</th>
              <th scope="col">age</th>
              <th scope="col">espèce</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.animals.map((animal: Animal) => (
              <tr key={animal.id}>
                <td>{animal.id}</td>
                <td>{animal.name}</td>
                <td>{animal.age}</td>
                <td>{animal.type}</td>
                <td className="spaceBetween">
                  <button></button>
                  <div className="flex">
                    <button onClick={() => onDelete(animal.id)}>
                      <Image
                        src="/images/delete.png"
                        alt="image login"
                        width={32}
                        height={32}
                      />
                    </button>
                    <Link href={"/edit-animal/" + animal.id} key={animal.id}>
                      <a>
                        <Image
                          src="/images/edit.png"
                          alt="image login"
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <button className="buttonlog" type="submit">
          Ajouter son animal !
        </button>
      </form>
    </>
  );
};

export default Index;
