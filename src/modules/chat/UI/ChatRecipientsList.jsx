import { Fragment } from "react";
import { SearchMessages } from "./SearchMessages";
import sprite from "../../../assets/icons/sprite.svg";

export const ChatRecipientsList = () => {
  const recipientList = [
    {
      username: "JohnDoe",
      imageUrl: "",
      lastChatMessage: "Hey there, how are you?",
      chatMessageDate: "Jul 2",
    },
    {
      username: "JaneSmith",
      imageUrl: "https://example.com/janesmith.jpg",
      lastChatMessage: "I'm doing great, thanks!",
      chatMessageDate: "Jun 28",
    },
    {
      username: "AlexJohnson",
      imageUrl: "",
      lastChatMessage: "Did you watch the game last night?",
      chatMessageDate: "Jun 22",
    },
    {
      username: "EmilyDavis",
      imageUrl: "",
      lastChatMessage: "No, I missed it. How was it?",
      chatMessageDate: "May 13",
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
                    border-gray-light-3"
                key={index + 1}
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
                  <p className="font-bold">{recipient.username}</p>
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
