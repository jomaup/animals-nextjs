import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";

<Image
  className="ml-32"
  src="/images/logonav.png"
  alt="image login"
  width={500}
  height={300}
/>;

export const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/local/signin",
        {
          username: form.username,
          password: form.password,
        }
      );

      const User = JSON.stringify({
        username: response.data.username,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      localStorage.setItem("user", User);
      Router.push({pathname:`/liste`, query: { username: form.username}}, "/liste");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("different error than axios");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    }
  }, []);

  return (
    <>
      <div className="center">
        <form onSubmit={handleSubmit}>
          <Image
            className="ml-32"
            src="/images/logonav.png"
            alt="image login"
            width={500}
            height={300}
          />
          <div className="champs">
            <div className="inputbox">
              <input
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
              />
              <span>Username</span>
            </div>
            <div className="inputbox">
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
              <span>Password</span>
            </div>
            <div className="inputbox select">
              <button className="buttonlog" type="submit">
                Se connecter
              </button>
            </div>
          </div>
          <div className="error">{error}</div>
        </form>
        <Link href={"register"}>S'inscrire</Link>
      </div>
    </>
  );
};
