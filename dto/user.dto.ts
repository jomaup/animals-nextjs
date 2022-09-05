import { Message } from "./messages";

export type UserDTO = {
  id: string;
  username: string;
  password: string;
  messages?: Message[];
  self: boolean;
  connected: boolean;
};
