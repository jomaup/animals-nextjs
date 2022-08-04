import { Conversation } from "./conversation";
import { UserDTO } from "./user.dto";

export type Message = {
  id?: number;
  message?: string;
  user?: UserDTO;
  conversation?: Conversation;
  createdAt?: Date;
};
