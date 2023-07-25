import { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";

// export const ChatMessages = ({ messageList }) => {
export const ChatMessages = () => {
  const messageList = [
    {
      senderId: "user1",
      recipientId: "user2",
      createdAt: "2023-07-25T12:00:00Z",
      senderImageUrl: "https://example.com/user1.jpg",
      recipientImageUrl: "https://example.com/user2.jpg",
      isRead: true,
      isDelivered: true,
      message: "Hello, how are you?",
    },
    {
      senderId: "user2",
      recipientId: "user1",
      createdAt: "2023-07-25T13:15:00Z",
      senderImageUrl: "https://example.com/user2.jpg",
      recipientImageUrl: "https://example.com/user1.jpg",
      isRead: false,
      isDelivered: true,
      message: "I'm doing great! Thanks for asking.",
    },
    {
      senderId: "user1",
      recipientId: "user3",
      createdAt: "2023-07-25T14:30:00Z",
      senderImageUrl: "https://example.com/user1.jpg",
      recipientImageUrl: "https://example.com/user3.jpg",
      isRead: true,
      isDelivered: true,
      message: "Hey there, what's up?",
    },
    {
      senderId: "user3",
      recipientId: "user1",
      createdAt: "2023-07-25T15:45:00Z",
      senderImageUrl: "https://example.com/user3.jpg",
      recipientImageUrl: "https://example.com/user1.jpg",
      isRead: true,
      isDelivered: false,
      message: "Not much, just working on some stuff.",
    },
  ];

  // TODO: to sort messages accordingly

  return (
    <Fragment>
      <div className="p-4 pt-8">
        <MessagePrimary />
      </div>
    </Fragment>
  );
};
