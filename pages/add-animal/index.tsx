import dynamic from "next/dynamic";
import { NextPage } from "next/types";

const Home: NextPage = () => {
  const isBrowser = typeof window !== "undefined";

  const AddAnimal = dynamic(
    async () => {
      const m = await import("../../components/AddAnimal");
      return m.AddAnimalForm;
    },
    { ssr: false }
  );

  return isBrowser ? <AddAnimal /> : null;
};

export default Home;
