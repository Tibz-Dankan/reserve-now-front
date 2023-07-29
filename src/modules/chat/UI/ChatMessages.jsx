import { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { AppDate } from "../../../shared/utils/appDate";
import { Messages } from "../utils/organizeMessages";

// export const ChatMessages = ({ messageList }) => {
export const ChatMessages = () => {
  const messageList = [
    {
      senderId: "user1",
      recipientId: "user2",
      createdAt: "2023-07-25T13:15:00Z",
      senderImageUrl: "https://example.com/user1.jpg",
      recipientImageUrl: "https://example.com/user2.jpg",
      isRead: true,
      isDelivered: true,
      message: "Hello, how are you?",
    },
    {
      senderId: "user3",
      recipientId: "user1",
      createdAt: "2023-07-25T14:35:00Z",
      senderImageUrl: "https://example.com/user1.jpg",
      recipientImageUrl: "https://example.com/user3.jpg",
      isRead: true,
      isDelivered: true,
      message: "Hey there, what's up?",
    },
    {
      senderId: "user1",
      recipientId: "user2",
      createdAt: "2023-07-25T13:15:00Z",
      senderImageUrl: "https://example.com/user2.jpg",
      recipientImageUrl: "https://example.com/user1.jpg",
      isRead: false,
      isDelivered: true,
      message: "I'm doing great! Thanks for asking.",
    },
    {
      senderId: "user3",
      recipientId: "user1",
      createdAt: "2023-07-28T14:40:00Z",
      senderImageUrl: "https://example.com/user3.jpg",
      recipientImageUrl: "https://example.com/user1.jpg",
      isRead: true,
      isDelivered: false,
      message: "Not much, just working on some stuff.",
    },
  ];

  const currentUser = {
    id: "user1",
    name: "Tibesigwa Dankan",
    imageUrl: "",
  };

  const recipient = {
    id: "user2",
    name: "Kusiima Nathaniel",
    imageUrl: "",
  };

  const day = (date) => {
    console.log("new AppDate(date).day()");
    console.log(new AppDate(date).day());
    return new AppDate(date).day();
  };
  // TODO: to sort messages accordingly
  const messages = new Messages(currentUser, recipient).organize(messageList);
  console.log("messages");
  console.log(messages);

  return (
    <Fragment>
      <div className="p-4 pt-8">
        {messages.map((message, index) => {
          return (
            <div key={index + 1}>
              {message.showDay && <p>{day(message.createdAt)}</p>}
              {message.isPrimaryMessage && <MessagePrimary msg={message} />}
              {!message.isPrimaryMessage && <MessageSecondary msg={message} />}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
