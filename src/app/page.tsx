"use client";
import Link from "next/link";
import { useState } from "react";

type qouteType = string[];

export default function Home() {
  const [qoute] = useState<qouteType>(["hello", "hey", "hi"]);
  const [user] = useState("user");

  return (
    <div className="w-full py-20 px-10 flex flex-col justify-center items-center">
      <Link
        href="/login"
        className="bg-orange-400 text-white font-bold px-10 py-2 rounded-full fixed top-2 right-5"
      >
        Login
      </Link>
      {user === "user" ? (
        <>
          <div className="flex items-center gap-4">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              className="my-4 px-2 py-1 bg-slate-300 rounded-xl outline-none"
            />
          </div>
          <ul className="w-full flex flex-col items-center gap-4">
            {qoute.map((item, index) => {
              return (
                <li key={index} className="w-[50%] p-4 bg-slate-300 rounded-xl">
                  <p>{item}</p>
                  <p>Vote : score</p>
                  <button
                    type="button"
                    className="bg-orange-400 text-white font-bold px-4 py-2 rounded-full"
                  >
                    Vote
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}
