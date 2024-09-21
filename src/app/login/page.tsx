"use client";
import { useState } from "react";

type typeInput = string | number;

export default function Login() {
  const [username, setUsername] = useState<typeInput>("");
  const [password, setPassword] = useState<typeInput>("");

  const usernameChange = (e: { target: { value: typeInput } }) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: { target: { value: typeInput } }) => {
    setPassword(e.target.value);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="bg-slate-300 p-10 min-w-[300px] w-[25%] rounded-2xl flex flex-col justify-center items-center gap-6">
        <header className="text-center">Login</header>
        <main>
          <form className="flex flex-col gap-2">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              name="Username"
              value={username}
              onChange={usernameChange}
            />

            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="Password"
              value={password}
              onChange={passwordChange}
            />
          </form>
        </main>
        <footer className="w-full flex justify-center gap-2">
          <button
            type="button"
            className="text-white bg-orange-500 hover:bg-orange-700 py-2 px-6 rounded-full"
          >
            login
          </button>
          <button
            type="button"
            className="text-balck bg-white hover:text-white hover:bg-slate-400  py-2 px-6 rounded-full"
          >
            Register
          </button>
        </footer>
      </div>
    </section>
  );
}
