import axios from "axios";
import { NextPage } from "next/types";
import { useState } from "react";
import io from "socket.io-client";
import { ChatEntity } from "../dto/chat";

const socket = io.connect("animals-nest-js.herokuapp.com/", {
  transports: ["websocket"],
});

export const Chat = () => {
  const msgBox = document.getElementById(
    "exampleFormControlTextarea1"
  ) as HTMLElement;
  const msgCont = document.getElementById("data-container") as HTMLElement;
  const usernameBox = document.getElementById("username") as HTMLElement;

  if (msgBox) {
    msgBox.addEventListener("keydown", (e) => {
      sendMessage({ username: username, text: text });
    });
  }

  const messages: ChatEntity[] = [];
  const [username, setUsername] = useState<string>("");
  const [text, setText] = useState<string>("");
  function getMessages() {
    axios
      .get("/chat")
      .then((data: any) => {
        loadDate(data);
        data.forEach((el: ChatEntity) => {
          messages.push(el);
        });
      })
      .catch((err) => console.log(err));
  }

  getMessages();

  function loadDate(data: ChatEntity[]) {
    let messages = "";
    data.map((message: { username: string; text: string }) => {
      messages += ` <li className="bg-primary p-2 rounded mb-2 text-light">
             <span className="fw-bolder">${message.username}</span>
             ${message.text}
           </li>`;
    });
    msgCont.innerHTML = messages;
  }

  function sendMessage(message: { username: any; text: any }) {
    socket.emit("sendMessage", message);
  }

  socket.on("recMessage", (message: ChatEntity) => {
    messages.push(message);
    loadDate(messages);
  });

  return (
    <div className="container">
      <div className="mb-3 mt-3">
        <ul id="data-container"></ul>
      </div>
      <div className="mb-3 mt-4">
        <input
          className="form-control"
          id="usernameBox"
          placeholder="Your Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3 mt-4">
        <input
          className="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Say something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};
