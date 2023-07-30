import { Fragment, useState, useEffect, useRef } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { Button } from "../../../shared/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToMessageList } from "../../../store/actions/chat";
import { generateChatRoomId } from "../utils/generateChatRoomId";

export const ChatInBoxForm = (props) => {
  const currentUser = useSelector((state) => state.auth.user);
  const recipient = useSelector((state) => state.chat.currentRecipient);

  const [message, setMessage] = useState("");
  const createdAt = new Date().toISOString();
  const chatRoomId = generateChatRoomId(currentUser.id, recipient.id);
  const effectRan = useRef(false);
  const dispatch = useDispatch();

  const onChangeMessageHandler = (event) => setMessage(event.target.value);

  const messageObj = {
    senderId: currentUser.id,
    recipientId: recipient.id,
    chatRoomId: chatRoomId,
    message: message,
    isRead: false,
    isDelivered: false,
    createdAt: createdAt,
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    dispatch(addToMessageList(messageObj));
    props.socket.emit("sendMessage", messageObj);
    setMessage("");
  };

  useEffect(() => {
    if (effectRan.current === false) {
      props.socket.on("receiveMessage", (messageObj) => {
        dispatch(addToMessageList(messageObj));
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [props.socket]);

  return (
    <Fragment>
      <form onSubmit={(event) => sendMessageHandler(event)}>
        <div
          className="flex items-center justify-center border-y-[1px] border-gray-light-3
             p-4 gap-x-4"
        >
          <input
            type="text"
            className="h-9 w-[80%]  border-[2px] border-gray-dark-2 outline-none
           focus:border-primary transition-transform rounded"
            value={message}
            onChange={(event) => onChangeMessageHandler(event)}
          />
          <svg className="w-[24px] h-[24px] fill-gray-dark-1">
            <use href={`${sprite}#icon-chevron-up`}></use>
          </svg>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-x-2">
            <svg className="w-[24px] h-[24px] fill-gray-dark-2 cursor-pointer">
              <use href={`${sprite}#icon-attach-file`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-gray-dark-2 cursor-pointer">
              <use href={`${sprite}#icon-gif`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-gray-dark-2 cursor-pointer">
              <use href={`${sprite}#icon-emoji`}></use>
            </svg>
          </div>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Fragment>
  );
};
