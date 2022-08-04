import { Message } from "./messages";
import { UserDTO } from "./user.dto";

export type Conversation = {
  id: number;
  users: UserDTO[];
  messages: Message[];
};
