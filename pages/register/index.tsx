import { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const isBrowser = typeof window !== "undefined";

  const SignUp = dynamic<{}>(
    async () => {
      const m = await import("../../components/formulaires/signupForm");
      return m.SignupForm;
    },
    { ssr: false }
  );

  return isBrowser ? (
    <>
      <SignUp />
    </>
  ) : null;
};

export default Home;
