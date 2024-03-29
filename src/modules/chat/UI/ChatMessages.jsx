import { Fragment, useEffect, useRef } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { AppDate } from "../../../shared/utils/appDate";
import { Messages } from "../utils/organizeMessages";
import { addToMessageList } from "../../../store/actions/chat";
import { useDispatch, useSelector } from "react-redux";

export const ChatMessages = (props) => {
  const messageList = useSelector((state) => state.chat.messageList);
  const currentUser = useSelector((state) => state.auth.user);
  const recipient = useSelector((state) => state.chat.currentRecipient);
  const effectRan = useRef(false);

  const dispatch = useDispatch();

  // Netlify auth token -> CXHmsYoZgIPSVU3sTWV2A5oGzB3BxNcW82nL9KRcVOk

  const day = (date) => new AppDate(date).day();
  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     props.socket.on("receiveMessage", (messageObj) => {
  //       dispatch(addToMessageList(messageObj));
  //     });
  //     return () => {
  //       effectRan.current = true;
  //     };
  //   }
  // }, [props.socket]);

  const messages = new Messages(currentUser, recipient).organize(messageList);
  console.log(messages);

  return (
    <Fragment>
      <div
        className="p-4 pt-8 h-[55vh] overflow-x-hidden relative"
        id="message-container"
      >
        {messages.map((message, index) => {
          return (
            <div key={index + 1}>
              {message.showDay && (
                <p className="flex items-center justify-between mb-3">
                  <span className="h-[1px] grow bg-gray-light-4"></span>
                  <span className="bg-gray-300 px-2 py-1 rounded-md mx-2 text-gray-700">
                    {day(message.createdAt)}
                  </span>
                  <span className="h-[1px] grow bg-gray-light-4"></span>
                </p>
              )}
              {message.isPrimaryMessage && <MessagePrimary msg={message} />}
              {!message.isPrimaryMessage && <MessageSecondary msg={message} />}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
