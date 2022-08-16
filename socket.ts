import { io, Socket } from "socket.io-client";

const URL = "http://localhost:5000/room";

interface ISocket extends Socket {
    userId?: string;
    sessionID?: string;
    username?: string;
  }

const connect = () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("CapacitorStorage.token")
      : null;
  const socket: ISocket = io(URL, {
    transports: ["websocket", "polling"],
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: token,
        },
      },
    },
  });
  return socket;
};

const socket = connect();

export default socket