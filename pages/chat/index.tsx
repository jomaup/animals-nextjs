// App.js
import { useState, useEffect } from "react";
import socket from "../../socket";

const App = () => {
  // start by adding state
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("socket", socket);

  useEffect(() => {
    socket.on("user joined", (msg: string) => {
      console.log("user joined message", msg);
      setConnected(true);
    });

    return () => {
      socket.off("user joined");
    };
  }, []);

  // add few functions/event handlers
  const handleUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("username", username);
    setConnected(true);
    console.log(connected);
  };

  // handle message
  const handleMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", `${username} - ${message}`);
    setMessage("");
  };

  // conditionally render two different inputs for message and username
  return (
    <div className="container text-center">
      <div className="row">
        {connected ? (
          <form onSubmit={handleMessage} className="text-center pt-3">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type your message"
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-secondary" type="submit">
                  Send
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleUsername} className="text-center pt-3">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-secondary" type="submit">
                  Join
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
