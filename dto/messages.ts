import { Conversation } from "./conversation";
import { UserDTO } from "./user.dto";

export type Message = {
  id?: number;
  content?: string;
  fromSelf: boolean
  from:UserDTO;
};
