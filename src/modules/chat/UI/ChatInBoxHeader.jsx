import { Fragment, useEffect, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { useSelector } from "react-redux";

export const ChatInBoxHeader = () => {
  const showImage = false;

  const [showOnlineStatus, setShowOnlineStatus] = useState(false);
  const recipient = useSelector((state) => state.chat.currentRecipient);

  useEffect(() => {
    setShowOnlineStatus(true);
    setTimeout(() => {
      setShowOnlineStatus(false);
    }, 3000);
  }, []);

  return (
    <Fragment>
      <div className="">
        <div
          className="flex items-center justify-between border-b-[1px]
             border-gray-light-3 px-3 py-1 gap-x-40"
        >
          <div className="flex items-center justify-center">
            <div
              className="bg-gray-light-3 flex items-center justify-center 
                w-10 h-10 rounded-[50%] relative"
            >
              {showImage && (
                <img
                  src={"recipient.imageUrl"}
                  alt={"recipient.username"}
                  className="w-full  h-full rounded-[50%]"
                />
              )}
              {!showImage && (
                <svg className="w-[24px] h-[24px] fill-gray-dark-1">
                  <use href={`${sprite}#icon-person-filled`}></use>
                </svg>
              )}
              {/* TODO: To dynamically change the color od the dot depending 
              on users online status(active[fill-green-600], active-5min-ago[fill-yellow-600] 
              active-beyond-5min[fill-gray-500])  */}
              <svg className="w-[24px] h-[24px] fill-green-600 absolute right-[-8px] bottom-[-4px]">
                <use href={`${sprite}#icon-dot`}></use>
              </svg>
            </div>
            <div className="ml-2">
              <p className="font-bold mb-[-4px]">{recipient.name}</p>
              <p className="text-sm text-gray-700">{recipient.role}</p>
            </div>
          </div>
          <div className=" w-[96px] relative p-3">
            <svg className="w-[24px] h-[24px] fill-primary absolute top-0 left-0">
              <use href={`${sprite}#icon-audio-call`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-primary absolute top-0 right-[36px]">
              <use href={`${sprite}#icon-video-call`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-primary absolute top-0 right-0">
              <use href={`${sprite}#icon-dots-y`}></use>
            </svg>
          </div>
        </div>
        {showOnlineStatus && (
          <div className="bg-green-600 text-gray-light-1 py-2 px-4 transition-transform">
            <span>Online</span>
          </div>
        )}
      </div>
    </Fragment>
  );
};
