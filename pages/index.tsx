import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const isBrowser = typeof window !== "undefined";

  const Login = dynamic<{}>(
    async () => {
      const m = await import("../components/formulaires/loginForm");
      return m.LoginForm;
    },
    { ssr: false }
  );

  return isBrowser ? (
    <>
      <Login />
    </>
  ) : null;
};

export default Home;
