import React, { useState, useEffect } from "react";
import Members from "../components/Members";
import { profiles } from "../assets/json/profiles";
import style from "../styles/Admin.module.css";
import def from "../styles/Default.module.css";
import Chatting from "../components/Chatting";
import axios from "axios";

type adminChat = {
  type: "admin-chat";
  data: {
    message: string;
    createdAt: string;
  };
};

function Admin() {
  const [profile, setProfile] = useState(profiles[0]);
  const [chattings, setChattings] = useState<adminChat[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    changeMember(idx);
  }, [profile, idx]);

  const changeMember = async (idx: number) => {
    setProfile(profiles[idx]);
    setIdx(idx);
    try {
      const response = await axios.get(
        `http://localhost:3000/message/${profile.name}`
      );

      const adminChats: adminChat[] = response.data.data.map(
        (chat: { message: string; createdAt: string }) => {
          return {
            type: "admin-chat",
            data: {
              message: chat.message,
              createdAt: chat.createdAt,
            },
          };
        }
      );

      console.log(adminChats);

      setChattings(adminChats);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={def.Body}>
      <img src="/images/logo.svg" className={style.logo} />
      <Members profiles={profiles} changeMember={changeMember} />

      <Chatting chattings={chattings} />
    </div>
  );
}

export default Admin;
