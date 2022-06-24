import { BrowserRouter as Router } from "react-router-dom";
import { NextPage } from "next/types";
import { AddAnimalForm } from "./components/AddAnimal";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const AddAnimal = dynamic<{}>(
    () => {
      return import("./components/AddAnimal").then((mod) => mod.AddAnimalForm);
    },
    { ssr: false }
  );

  const isBrowser = typeof window !== "undefined";

  return isBrowser ? <AddAnimal /> : null;
};

export default Home;
