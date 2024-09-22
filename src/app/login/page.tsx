"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type typeInput = string | number;

export default function Login() {
  const [username, setUsername] = useState<typeInput>("");
  const [password, setPassword] = useState<typeInput>("");
  const router = useRouter();

  const usernameChange = (e: { target: { value: typeInput } }) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: { target: { value: typeInput } }) => {
    setPassword(e.target.value);
  };

  const loginForm = async () => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/login`,
        { username: username, password: password }
      );
      localStorage.setItem("token", "Bearer " + data.data.token);
      localStorage.setItem("qoute_vote", data.data.qoute_vote);
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch {
      console.log("Connetion error");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="bg-slate-300 p-10 min-w-[300px] w-[25%] rounded-2xl flex flex-col justify-center items-center gap-6">
        <header className="text-center font-bold ">Login</header>
        <main>
          <form className="flex flex-col gap-2">
            <label htmlFor="Username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              name="Username"
              value={username}
              onChange={usernameChange}
            />

            <label htmlFor="Password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={password}
              onChange={passwordChange}
            />
            <button
              type="button"
              onClick={loginForm}
              className="text-white font-semibold bg-orange-500 hover:bg-orange-700 mt-2 py-2 px-6 rounded-full"
            >
              login
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("/register");
              }}
              className="text-balck font-semibold bg-white hover:text-white hover:bg-slate-400 mt-2 py-2 px-6 rounded-full"
            >
              Register
            </button>
          </form>
        </main>
      </div>
    </section>
  );
}
