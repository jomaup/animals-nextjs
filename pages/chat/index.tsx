import { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const Chat = dynamic<{}>(
    () => {
      return import("../../components/chat").then((mod) => mod.Chat);
    },
    { ssr: false }
  );

  const isBrowser = typeof window !== "undefined";

  return isBrowser ? <Chat /> : null;
};

export default Home;
