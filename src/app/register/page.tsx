"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type typeInput = string | number;

export default function Register() {
  const [username, setUsername] = useState<typeInput>("");
  const [password, setPassword] = useState<typeInput>("");
  const router = useRouter();

  const usernameChange = (e: { target: { value: typeInput } }) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: { target: { value: typeInput } }) => {
    setPassword(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/register`,
        { username: username, password: password }
      );
      router.push("/login");
    } catch {
      console.log("Connetion error");
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="bg-slate-300 p-10 min-w-[300px] w-[25%] rounded-2xl flex flex-col justify-center items-center gap-6">
        <header className="text-center font-bold ">Register</header>
        <main>
          <form onSubmit={submitForm} className="flex flex-col gap-2">
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
              type="submit"
              className="text-balck font-semibold bg-white hover:text-white hover:bg-slate-400 mt-3 py-2 px-6 rounded-full"
            >
              Register
            </button>
          </form>
        </main>
      </div>
    </section>
  );
}
