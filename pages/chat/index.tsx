import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import ChatComponent from "../../components/chat";
import { UserDTO } from "../../dto/user.dto";
import socket from "../../socket";

const App = () => {
  const onConnect = (username: string) => {
    socket.auth = { username: username }
    socket.connect()
  }

  const router = useRouter();
  const username = router.query.username
  useEffect(() => {

    if (typeof window !== 'undefined') {
      const sessionId = localStorage.getItem("sessionID");
      if(sessionId) {
        onConnect(router.query.username as string);
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

  return <ChatComponent username={username as string} />;
};

export default App;
