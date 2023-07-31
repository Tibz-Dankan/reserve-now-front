import { Fragment } from "react";
import { ChatInBoxHeader } from "./ChatInBoxHeader";
import { ChatInBoxForm } from "./ChatInBoxForm";
import { ChatMessages } from "./ChatMessages";
import { ScrollToBottom } from "../../../shared/UI/ScrollToBottom";

export const ChatInBox = (props) => {
  return (
    <Fragment>
      <div
        className="border-[1px] border-gray-light-3 rounded-tr-lg
          h-full"
      >
        <ChatInBoxHeader />
        <ChatMessages socket={props.socket} />
        <ScrollToBottom elementId="#message-container" />
        <ChatInBoxForm socket={props.socket} />
      </div>
    </Fragment>
  );
};
