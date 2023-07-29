import { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { AppDate } from "../../../shared/utils/appDate";
import { Messages } from "../utils/organizeMessages";
import { useSelector } from "react-redux";

export const ChatMessages = () => {
  const messageList = useSelector((state) => state.chat.messageList);
  // const currentUser = useSelector((state) => state.auth.user);
  // const recipient = useSelector((state) => state.chat.currentRecipient);

  const currentUser = {
    id: "user1",
    name: "Tibs Dankan",
    imageUrl: "",
  };

  const recipient = {
    id: "user2",
    name: "Kusiima Nathaniel",
    imageUrl: "",
  };

  const day = (date) => new AppDate(date).day();

  const messages = new Messages(currentUser, recipient).organize(messageList);
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
