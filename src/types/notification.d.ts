import { User } from "./user";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "general" | "mail" | "critical";
  sender: User;
  recipient: User;
  createdAt: string;
  readAt?: string;
}
