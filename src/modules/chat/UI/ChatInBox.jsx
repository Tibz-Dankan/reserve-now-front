import React, { Fragment } from "react";
import { ChatInBoxHeader } from "./ChatInBoxHeader";
import { ChatInBoxForm } from "./ChatInBoxForm";
import { ChatMessages } from "./ChatMessages";

export const ChatInBox = () => {
  return (
    <Fragment>
      <div>
        <ChatInBoxHeader />
        <ChatMessages />
        <ChatInBoxForm />
      </div>
    </Fragment>
  );
};
