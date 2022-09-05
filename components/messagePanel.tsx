import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Message } from "../dto/messages"
import { UserDTO } from "../dto/user.dto"
import socket from "../socket"

interface Props {
    username: string
}

export const MessagePanel = (props: Props) => {
    const [form, setForm] = useState<string>()

    const [user, setUser] = useState<UserDTO>() 

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        socket.emit("input", form)
        setForm(form)
    }

    const getLocalUserInformations = async (username: string | string[] | undefined) => {
        const res: AxiosResponse<UserDTO> = await axios.post(
          "http://localhost:5000/auth/username",
          username
        );
        setUser(res.data)
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

      useEffect(() => {
        getLocalUserInformations(user?.username)
      })

    return (
        <>
           {user && user.messages?.map((message: Message, index: number) => {
                <div key={index}>{message.content}</div>
            })}
            <form onSubmit={onSubmit}>
                <input onChange={(e) =>
                  setForm(e.target.value)
                }></input>
                <button>Envoyer</button>
            </form> 
           
        </>
            )
}