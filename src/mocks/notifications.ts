import { Notification } from "@/types/notification";
import { mockUsers } from "./users";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome!",
    message: "Thank you for joining the community.",
    type: "general",
    sender: mockUsers.find((user) => user.role === "admin")!,
    recipient: mockUsers.find((user) => user.role === "resident")!,
    createdAt: "2025-01-07T08:00:00Z",
  },
  {
    id: "2",
    title: "Mail Alert",
    message: "You have a package at the reception.",
    type: "mail",
    sender: mockUsers.find((user) => user.role === "receptionist")!,
    recipient: mockUsers.find((user) => user.role === "resident")!,
    createdAt: "2025-01-07T09:30:00Z",
    readAt: "2025-01-07T10:00:00Z",
  },
  {
    id: "3",
    title: "Mail Alert",
    message: "You have a package at the reception.",
    type: "critical",
    sender: mockUsers.find((user) => user.role === "receptionist")!,
    recipient: mockUsers.find((user) => user.role === "resident")!,
    createdAt: "2025-01-07T09:30:00Z",
    // readAt: "2025-01-07T10:00:00Z",
  },

  {
    id: "4",
    title: "Important Update",
    message:
      "This is a very long notification message that is meant to test the truncation functionality in the notification list. It should not break into multiple lines.",
    type: "general",
    createdAt: "2025-01-07T10:00:00Z",
    sender: mockUsers.find((user) => user.role === "receptionist")!,
    recipient: mockUsers.find((user) => user.role === "resident")!,
  },
];
