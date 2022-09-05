
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Message } from "../dto/messages";
import { UserDTO } from "../dto/user.dto";
import socket from "../socket";

interface Props {
  username: string
}

const ChatComponent = (props: Props) => {
  const [form, setForm] = useState<string>()
  const [selectedUser, setSelectedUser] = useState<UserDTO>()
  const [users, setUsers] = useState<UserDTO[]>([])
  const [localUser, setLocalUser] = useState<UserDTO>()
  const [messages, setMessages] = useState<Message[]>();

  const getLocalUserInformations = async (username: string | string[] | undefined) => {
    const res: AxiosResponse<UserDTO> = await axios.post(
      "http://localhost:5000/auth/username",
      username
    );
    setLocalUser(res.data)
    console.log(res.data)
  }

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users")

    setUsers(res.data)
  }
  


// const displaySender = (message: Message, index: number) => {
//     if(user) {
//         return (
//             index === 0 ||
//             user.messages[index - 1].fromSelf !==
//               user.messages[index].fromSelf
//           );
//     }   
//   }

  const onMessage  = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(selectedUser) {
      socket.emit("private message",{ 
        form,
        selectedUser
      })
    }
  }

  const selectUser = (user: UserDTO) => {
    setSelectedUser(user)
    console.log(user)
  }

  useEffect(() => {
    getUsers();
    getLocalUserInformations(props.username);

    socket.on("connect", () => {
      users.forEach((user: UserDTO) => {
        if(user.self) {
          user.connected = true
        }
      })
    });
    socket.on("users", (users: UserDTO[]) => {
      console.log(users)
      users.forEach((user: UserDTO) => {
        if(user.messages) {
          user.messages.forEach((message) => {
            message.fromSelf = message.from.id === socket.userId;
          });
          for (let i = 0; i < users.length; i++) {
            const existingUser = users[i];
            if (existingUser.id === user.id) {
              existingUser.connected = user.connected;
              existingUser.messages = user.messages;
              return;
            }
          }
          user.self = user.id === socket.userId;
      
          setUsers([...users, user])  
        }
      });
      
      users.sort((a: UserDTO, b: UserDTO) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    }); 

    socket.on("user connected", (user: UserDTO) => {
      for (let i = 0; i < users.length; i++) {
        const existingUser = users[i];
        if (existingUser.id === user.id) {
          existingUser.connected = true;
          return;
        }
      }

      users.push(user);
    });

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.id === id) {
          user.connected = false;
          break;
        }
      }
    });

    socket.on("private message", ({ content, from, to }) => {
      for (let i = 0; i < users.length; i++) {
        console.log(users);
        const user = users[i];
        const fromSelf = socket.id === from;
        if (user.id === (fromSelf ? to : from)) {
          if(user.messages){
            user.messages.push({
              content,
              fromSelf,
              from: from
            });
            console.log(users)
          }
          break;
        }
      }
    });

    console.log(users)

  }, [])

    return (
      <>
        <div className="flex justify-center w-full">
            <div>
              {users.filter((user) => user.username !== props.username).map((user: UserDTO) => (
                <div key={user.id} onClick={() => selectUser(user)}>{user.username}</div>
              ))}
            </div>
            <div>
              {typeof selectedUser !== "undefined" && 
                  <div>
                    {selectedUser.messages?.map((message: Message, index: number) => (
                      <div key={index}>{message.content}</div>
                  ))}
                  </div>
              }
            </div>
            <form onSubmit={onMessage}>
                <input onChange={(e) =>
                  setForm(e.target.value)
                }></input>
                <button>Envoyer</button>
            </form>
        </div>
      </>
    );
  
}

export default ChatComponent
    