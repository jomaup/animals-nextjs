import axios from "axios";
import { NextPage } from "next/types";
import { Socket } from "ngx-socket-io";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Observable } from "redux";
import io from "socket.io-client";
import { ChatEntity } from "../dto/chat";
import { UserDTO } from "../dto/user.dto";

export const Chat = async () => {
  const [form, setForm] = useState("");
  const [users, setUsers] = useState<UserDTO[]>();

  const socket = io("http://localhost:5000");

  let [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    socket.emit("sendMessage", message);
  };

  const getMessages = () => {
    axios.get("http://localhost:5000/chat").then((res: any) => {
      setMessages(res);
    });
  };
  const res = await axios.get("http://localhost:5000/users");

  useEffect(() => {
    socket.on("newMessage", (message: string) => messages.push(message));
    getMessages();
    setUsers(res.data);
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = form;
    if (!message) return;
    sendMessage(message);
    console.log(form);
  };

  return (
    <div>
      <div id="message-container">{messages}</div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => setForm(e.target.value)} />
        <button>submit</button>
      </form>
    </div>
  );
};
