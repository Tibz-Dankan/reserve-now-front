import React, { Fragment } from "react";
import { SearchMessages } from "./SearchMessages";
import sprite from "../../../assets/icons/sprite.svg";

export const ChatRecipientsList = () => {
  const recipientList = [
    {
      username: "JohnDoe",
      imageUrl: "",
      lastChatMessage: "Hey there, how are you?",
      chatMessageDate: "2023-07-21 09:30:15",
    },
    {
      username: "JaneSmith",
      imageUrl: "https://example.com/janesmith.jpg",
      lastChatMessage: "I'm doing great, thanks!",
      chatMessageDate: "2023-07-21 10:45:22",
    },
    {
      username: "AlexJohnson",
      imageUrl: "",
      lastChatMessage: "Did you watch the game last night?",
      chatMessageDate: "2023-07-22 18:15:50",
    },
    {
      username: "EmilyDavis",
      imageUrl: "",
      lastChatMessage: "No, I missed it. How was it?",
      chatMessageDate: "2023-07-22 19:05:03",
    },
  ];

  return (
    <Fragment>
      <div className="border-[1px] border-gray-light-3 rounded-tl-lg">
        <div
          className="flex items-center justify-between border-b-[1px] 
            border-gray-light-3  p-3"
        >
          <span>Messaging</span>
          <span>svg icon</span>
        </div>
        <div>
          <SearchMessages />
        </div>
        <div>
          {recipientList.map((recipient) => {
            return (
              <div className="relative p-4 flex items-center justify-center">
                {recipient.imageUrl && (
                  <img src={recipient.imageUrl} alt={recipient.username} />
                )}
                {!recipient.imageUrl && (
                  <div className="bg-gray-light-3 flex items-center justify-center w-12 h-12 rounded-[50%]">
                    <svg className="w-[36px] h-[36px] fill-gray-dark-1">
                      <use href={`${sprite}#icon-person-filled`}></use>
                    </svg>
                  </div>
                )}
                <div className="px-2 text-sm">
                  <p className="font-bold">{recipient.username}</p>
                  <p className="text-gray-500">{recipient.lastChatMessage}</p>
                </div>
                <span>{recipient.chatMessageDate}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
