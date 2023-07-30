import { Fragment } from "react";
import { SearchMessages } from "./SearchMessages";
import sprite from "../../../assets/icons/sprite.svg";
import { generateChatRoomId } from "../utils/generateChatRoomId";
import { updateCurrentRecipient } from "../../../store/actions/chat";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getChatRecipients } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";

export const ChatRecipientsList = (props) => {
  const currentUserId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery(
    ["chatRecipientList"],
    () => getChatRecipients(currentUserId, token),
    {
      onError: (error) => {
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data fetched(Recipient)</p>;

  const recipientList = data?.data;

  const joinChatRoom = async (recipient) => {
    const chatRoomId = generateChatRoomId(currentUserId, recipient.id);
    dispatch(updateCurrentRecipient(recipient));
    props.socket.emit("joinRoom", chatRoomId);
  };

  return (
    <Fragment>
      <div className="border-[1px] border-gray-light-3 rounded-tl-lg">
        <div
          className="flex items-center justify-between border-b-[1px] 
            border-gray-light-3  p-3"
        >
          <span>Messaging</span>
          <svg className="w-[16px] h-[16px] fill-gray-dark-4">
            <use href={`${sprite}#icon-new-message`}></use>
          </svg>
        </div>
        <div>
          <SearchMessages />
        </div>
        <div>
          {recipientList.map((recipient, index) => {
            return (
              <div
                className="relative p-4 flex items-center justify-start border-b-[1px]
                    border-gray-light-3 cursor-pointer"
                key={index + 1}
                onClick={() => joinChatRoom(recipient)}
              >
                {recipient.imageUrl && (
                  <div
                    className="bg-gray-light-3 flex items-center justify-center 
                        w-12 h-12 rounded-[50%]"
                  >
                    <img
                      src={recipient.imageUrl}
                      alt={recipient.username}
                      className="w-full  h-full rounded-[50%]"
                    />
                  </div>
                )}
                {!recipient.imageUrl && (
                  <div
                    className="bg-gray-light-3 flex items-center justify-center 
                        w-12 h-12 rounded-[50%]"
                  >
                    <svg className="w-[36px] h-[36px] fill-gray-dark-1">
                      <use href={`${sprite}#icon-person-filled`}></use>
                    </svg>
                  </div>
                )}
                <div className="px-2 text-sm">
                  <p className="font-bold">{recipient.name}</p>
                  <p className="text-gray-500">{recipient.lastChatMessage}</p>
                </div>
                <span className="absolute top-4 right-4 text-[12px]">
                  {recipient.chatMessageDate}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
