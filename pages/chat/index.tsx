import { useEffect, useState } from "react";
import ChatComponent from "../../components/chat";
import { UserDTO } from "../../dto/user.dto";
import socket from "../../socket";

const App = (username: string) => {
  const onConnect = (username: string) => {
    socket.auth = { username }
    socket.connect()
  }
  useEffect(() => {
    onConnect(username);

    if (typeof window !== 'undefined') {
      const sessionId = localStorage.getItem("sessionID");
      if(sessionId) {
        socket.auth = { sessionId };
        socket.connect();
      }
    } 
    

    socket.on("session", ({sessionID , userId}) => {
      socket.auth = { sessionID }
      if (typeof window !== 'undefined') {
      localStorage.setItem("sessionID", sessionID);
      }
      socket.userId = userId;
    })
  })

  return <ChatComponent username={username} />;
};

export default App;
