import React, { Fragment } from "react";
import { ChatInBoxHeader } from "./ChatInBoxHeader";
import { ChatInBoxForm } from "./ChatInBoxForm";
import { ChatMessages } from "./ChatMessages";

export const ChatInBox = () => {
  return (
    <Fragment>
      <div
        className="border-[1px] border-gray-light-3 rounded-tr-lg
      h-full"
      >
        <ChatInBoxHeader />
        <ChatMessages />
        <ChatInBoxForm />
      </div>
    </Fragment>
  );
};
