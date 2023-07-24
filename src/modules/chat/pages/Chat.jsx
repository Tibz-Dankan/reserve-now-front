import React, { Fragment } from "react";
import { ChatInBox } from "../UI/ChatInBox";
import { ChatRecipientsList } from "../UI/ChatRecipientsList";

export const Chat = () => {
  return (
    <Fragment>
      <div className="w-[70wv] h-auto  p-4 flex items-start justify-center">
        <ChatRecipientsList />
        <ChatInBox />
      </div>
    </Fragment>
  );
};
