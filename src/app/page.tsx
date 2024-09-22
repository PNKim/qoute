"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

interface qouteType {
  id: number;
  qoute: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
  vote: number;
}

interface keyValue {
  [key: number]: boolean;
}

type userType = string | null;
type typeInput = string | number | undefined;

export default function Home() {
  const [qoute, setQoute] = useState([]);
  const [user, setUser] = useState<userType>("");
  const [addQoute, setAddQoute] = useState<typeInput>("");
  const [search, setSearch] = useState<typeInput>("");
  const [loadQoute, setLoadQoute] = useState(false);
  const [hidden, setHidden] = useState<keyValue>({});
  const [editQoute, setEditQoute] = useState<typeInput>("");
  const [userVote, setUserVote] = useState<string | number>("");

  let decoded: string | JwtPayload | null = "";
  if (user) {
    decoded = jwt.decode(user.split(" ")[1]);
  }

  const getQoute = async () => {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/qoute?qoute=${search}`
      );
      setQoute(data.data.qoutes);
    } catch {
      console.log("Connection Error");
    }
  };

  const searchChange = (e: { target: { value: typeInput } }) => {
    setSearch(e.target.value);
  };

  const qouteChange = (e: { target: { value: typeInput } }) => {
    setAddQoute(e.target.value);
  };

  const handleEditQoute = (e: { target: { value: typeInput } }) => {
    setEditQoute(e.target.value);
  };

  const AddNewQoute = async () => {
    try {
      if (decoded && typeof decoded !== "string") {
        const userId = decoded.userId;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/qoute`, {
          userId: userId,
          qoute: addQoute,
        });
        setLoadQoute(!loadQoute);
      }
    } catch {
      console.log("Connection error");
    }
  };

  const updateQoute = async (id: number) => {
    try {
      if (decoded && typeof decoded !== "string") {
        const userId = decoded.userId;
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/qoute`, {
          id: id,
          userId: userId,
          qoute: editQoute,
        });
        setLoadQoute(!loadQoute);
      }
    } catch {
      console.log("Connection error");
    }
  };

  const updateVote = async (id: number, vote: number) => {
    try {
      if (decoded && typeof decoded !== "string") {
        const userId = decoded.userId;
        let qouteId: number | null = id;
        if (userVote !== "null") {
          vote--;
          localStorage.setItem("qoute_vote", "null");
          qouteId = null;
        } else {
          localStorage.setItem("qoute_vote", String(id));
          vote++;
        }
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/qoute/vote`, {
          id: id,
          vote: vote,
        });
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/qoute/uservote`, {
          id: qouteId,
          userId: userId,
        });
        setLoadQoute(!loadQoute);
      }
    } catch {
      console.log("Connection error");
    }
  };

  const EditQoute = (id: number) => {
    const newQoute = { ...hidden };
    if (!newQoute[id]) {
      newQoute[id] = true;
    } else {
      newQoute[id] = false;
    }
    setHidden(newQoute);
  };

  useEffect(() => {
    setUser(localStorage.getItem("token"));
    setUserVote(localStorage.getItem("qoute_vote") ?? "");
    getQoute();
  }, [search, loadQoute]);

  return (
    <div className="w-full py-20 px-10 flex flex-col justify-center items-center">
      <Link
        href="/login"
        className="bg-orange-400 text-white font-bold px-10 py-2 rounded-full fixed top-2 right-5"
      >
        {decoded && typeof decoded !== "string" ? `${decoded.userId}` : "Login"}
      </Link>
      {user && decoded ? (
        <>
          <div className="flex flex-col gap-2 my-2">
            <div className="flex items-center gap-2">
              <label htmlFor="qoute">New Qoute</label>
              <input
                type="text"
                name="qoute"
                value={addQoute}
                onChange={qouteChange}
                className="px-2 py-1 bg-slate-300 rounded-xl outline-none"
              />
              <button
                type="button"
                onClick={AddNewQoute}
                className="bg-orange-400 text-white font-bold px-4 py-2 rounded-full"
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="search">Search</label>
              <input
                type="text"
                name="search"
                value={search}
                onChange={searchChange}
                className="px-2 py-1 bg-slate-300 rounded-xl outline-none"
              />
            </div>
          </div>
          <ul className="w-full flex flex-col items-center gap-4">
            {qoute[0]
              ? qoute.map((item: qouteType, index) => {
                  return (
                    <li
                      key={index}
                      className="w-[50%] p-4 bg-slate-300 rounded-xl"
                    >
                      {hidden[item.id] ? (
                        <input
                          type="test"
                          value={editQoute}
                          onChange={handleEditQoute}
                          className="w-full"
                        />
                      ) : (
                        <p>{item.qoute}</p>
                      )}

                      <p>Vote : {item.vote}</p>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          disabled={
                            userVote !== "null"
                              ? Number(userVote) === item.id
                                ? false
                                : true
                              : false
                          }
                          onClick={() => {
                            updateVote(item.id, item.vote);
                          }}
                          className={`${
                            userVote !== "null"
                              ? Number(userVote) === item.id
                                ? "bg-orange-400 text-white"
                                : "bg-slate-400 text-white"
                              : "bg-orange-400 text-white"
                          } font-bold px-4 py-2 rounded-full`}
                        >
                          Vote
                        </button>
                        {decoded &&
                          typeof decoded !== "string" &&
                          decoded.userId === item.userId && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditQoute(item.qoute);
                                  EditQoute(item.id);
                                }}
                                className="bg-orange-400 text-white font-bold px-4 py-2 rounded-full"
                              >
                                {hidden[item.id] ? "Cancel" : "Edit"}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updateQoute(item.id);
                                  EditQoute(item.id);
                                  setEditQoute("");
                                }}
                                className={`${
                                  hidden[item.id] ? "" : "hidden"
                                } bg-orange-400 text-white font-bold px-4 py-2 rounded-full`}
                              >
                                Confirm
                              </button>
                            </div>
                          )}
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}
