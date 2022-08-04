import axios from "axios";
import React from "react";
import Router from "next/router";
import { LocalUserRepository } from "../repositories/local-user.repository";
import { UserDTO } from "../dto/user.dto";
import { Conversation } from "../dto/conversation";
import { io } from "socket.io-client";
import { BehaviorSubject, Observable, Subscription, fromEvent } from "rxjs";
import { Message } from "../dto/messages";

interface Props {}

const URL = "http://localhost:5000/room";

const connect = () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("CapacitorStorage.token")
      : null;
  const socket = io(URL, {
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
export const socket = connect();

export default class ChatComponent extends React.Component<
  Props,
  {
    users: UserDTO[];
    messages: Message[];
    selectedConversationIndex: number;
    conversations: Conversation[];
    selectedUser: UserDTO;
    message: string;
    userId: string;
    conversation: Conversation;
    localUserInfos: UserDTO;
  }
> {
  conversationSubscription: Subscription = new Subscription();
  messagesSubscription: Subscription = new Subscription();
  newMessagesSubscription: Subscription = new Subscription();
  selectedUserSubscription: Subscription = new Subscription();
  usersSubscription: Subscription = new Subscription();
  userId: Subscription = new Subscription();

  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      selectedConversationIndex: 0,
      conversations: [],
      selectedUser: { id: "", username: "", password: "" },
      message: "",
      userId: "",
      conversation: { id: 0, users: [], messages: [] },
      localUserInfos: { id: "", username: "", password: "" },
    };
  }

  friend$: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>({
    id: "",
    username: "",
    password: "",
  });

  sendMessage(message: string, conversation: Conversation): void {
    try {
      const newMessage: Message = {
        message,
        conversation,
      };
      socket.emit("sendMessage", newMessage);
    } catch (e) {
      throw new Error("enable to send message");
    }
  }

  getNewMessage(): Observable<Message> {
    try {
      return fromEvent<Message>(socket, "newMessage");
    } catch (e) {
      throw new Error("reception du nouveau message impossible");
    }
  }

  createConversation(friend: UserDTO): void {
    try {
      socket.emit("createConversation", friend);
    } catch (e) {
      throw new Error("creation de conversation impossible");
    }
  }

  joinConversation(friendId: string): void {
    try {
      socket.emit("joinConversation", friendId);
    } catch (e) {
      throw new Error("impossible de rejoindre la conversation");
    }
  }

  leaveConversation(): void {
    try {
      socket.emit("leaveConversation");
    } catch (e) {
      throw new Error("impossible de quitter la conversation");
    }
  }

  getConversationMessages(): Observable<Message[]> {
    try {
      return fromEvent<Message[]>(socket, "messages");
    } catch (e) {
      throw new Error("impossible de recevoir les messages de la conversation");
    }
  }

  getConversations(): Observable<Conversation[]> {
    try {
      return fromEvent<Conversation[]>(socket, "conversations");
    } catch (e) {
      throw new Error("impossible de recevoir les conversations");
    }
  }

  getUsableUsers(): Observable<UserDTO[]> {
    return new Observable((observer) => {
      axios
        .get<UserDTO[]>("http://localhost:5000/users/usable")
        .then((res) => {
          observer.next(res.data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }

  openConversation(friend: UserDTO, index: number): void {
    this.setState({
      selectedConversationIndex: index,
    });

    socket.emit("leaveConversation");

    this.setState({ selectedUser: friend });

    this.friend$.next(friend);

    this.setState({ messages: [] });
  }

  localUser = new LocalUserRepository().get();

  getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      this.setState({ users: response.data });
    } catch (error) {
      Router.push("/liste");
    }
  };

  getLocalUserInfos = () => {
    console.log(this.state.users);
    const localUserInfos = this.state.users.find(
      (user) => user.username === this.localUser?.username
    );
    if (localUserInfos) {
      this.setState({ localUserInfos: localUserInfos });
    } else {
      throw new Error("unable to get localUser");
    }
  };

  componentDidMount() {
    this.getUsers();

    // this.getLocalUserInfos();

    this.usersSubscription = this.conversationSubscription =
      this.getConversations().subscribe((conversations: Conversation[]) => {
        this.setState(function addConversation(previousState: any) {
          return {
            conversations: [previousState, conversations],
          };
        });
      });

    this.messagesSubscription = this.getConversationMessages().subscribe(
      (messages: Message[]) => {
        messages.forEach((message: Message) => {
          const allMessageIds = this.state.messages.map(
            (message: Message) => message.id
          );
          if (!allMessageIds.includes(message.id)) {
            this.state.messages.push(message);
          }
        });
      }
    );

    this.newMessagesSubscription = this.getNewMessage().subscribe(
      (message: Message) => {
        message.createdAt = new Date();

        const allMessageIds = this.state.messages.map(
          (message: Message) => message.id
        );
        if (!allMessageIds.includes(message.id)) {
          this.state.messages.push(message);
        }
      }
    );
    this.selectedUserSubscription = this.friend$.subscribe((friend: any) => {
      if (JSON.stringify(friend) !== "{}") {
        this.joinConversation(this.state.selectedUser.id);
      }
    });
    this.usersSubscription = this.getUsableUsers().subscribe(
      (friends: UserDTO[]) => {
        this.setState({ users: friends });

        if (friends.length > 0) {
          this.setState({ selectedUser: this.state.users[0] });
          this.friend$.next(this.state.selectedUser);

          friends.forEach((friend: UserDTO) => {
            this.createConversation(friend);
          });
          this.joinConversation(this.state.selectedUser.id);
        }
      }
    );
  }

  onSubmit() {
    const message = this.state.message;
    if (!message) return;

    let conversationUserIds = [
      this.state.localUserInfos.id,
      this.state.selectedUser.id,
    ].sort();

    this.state.conversations.forEach((conversation: Conversation) => {
      let userIds = conversation.users.map((user: UserDTO) => user.id).sort();

      if (JSON.stringify(conversationUserIds) === JSON.stringify(userIds)) {
        this.setState({ conversation: conversation });
      }
    });

    this.sendMessage(message, this.state.conversation);
    this.setState({ message: "" });
  }

  componentWillUnmount() {
    socket.emit("leaveConversation");

    this.setState({
      selectedConversationIndex: 0,
      conversations: [],
      conversation: { id: 0, users: [], messages: [] },
      selectedUser: { id: "", username: "", password: "" },
      messages: [],
      users: [],
    });

    this.messagesSubscription.unsubscribe();
    this.conversationSubscription.unsubscribe();
    this.newMessagesSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.selectedUserSubscription.unsubscribe();
  }

  render() {
    return (
      <>
        <div className="flex justify-center w-full">
          <div className="flex justify-center space-x-2 p-2 border-2 border-black-600 w-4/5">
            {this.state.users.map((user: UserDTO, index: number) => (
              <div
                onClick={() => this.openConversation(user, index)}
                key={user.id}
              >
                {user.username}
              </div>
            ))}
          </div>
          <div className="flex-col justify-center space-x-2 p-2 border-2 border-black-600 w-4/5">
            {this.state.messages.map((message: Message, index: number) => (
              <div key={message.id}>{message.message}</div>
            ))}
          </div>
          <form onSubmit={() => this.onSubmit}>
            <div className="flex justify-center">
              <input
                onChange={(e) =>
                  this.setState({
                    message: e.target.value,
                  })
                }
              ></input>
            </div>
          </form>
        </div>
      </>
    );
  }
}
