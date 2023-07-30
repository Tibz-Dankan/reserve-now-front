import { Fragment } from "react";
import { ChatInBox } from "../UI/ChatInBox";
import { ChatRecipientsList } from "../UI/ChatRecipientsList";
import { MasterLayout } from "../../../shared/layouts/MasterLayout";

export const Chat = (props) => {
  return (
    <Fragment>
      <MasterLayout title="Chat">
        <div className="w-[70wv] h-auto  p-4 flex items-start justify-center">
          <ChatRecipientsList socket={props.socket} />
          <ChatInBox socket={props.socket} />
        </div>
      </MasterLayout>
    </Fragment>
  );
};
