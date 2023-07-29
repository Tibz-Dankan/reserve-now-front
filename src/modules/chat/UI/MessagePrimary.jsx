/* eslint-disable react/prop-types */
import { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { AppDate } from "../../../shared/utils/appDate";

export const MessagePrimary = ({ msg }) => {
  const time = () => new AppDate(msg?.createdAt).time();

  return (
    <Fragment>
      <div className="bg-green- flex items-center gap-x-1">
        <div
          className="bg-gray-light-3 flex items-center justify-center 
                w-10 h-10 rounded-[50%] relative"
        >
          {msg.userImageUrl && (
            <img
              src={"recipient.imageUrl"}
              alt={"recipient.username"}
              className="w-full  h-full rounded-[50%]"
            />
          )}
          {!msg.userImageUrl && (
            <svg className="w-[24px] h-[24px] fill-gray-dark-1">
              <use href={`${sprite}#icon-person-filled`}></use>
            </svg>
          )}
        </div>
        <span>{msg.username}</span>
        <svg className="w-[12px] h-[12px] fill-gray-500">
          <use href={`${sprite}#icon-dot`}></use>
        </svg>
        <span className="text-sm text-gray-500">{time()}</span>
      </div>
      <div className="mt-3 ml-9">
        <p
          className="text-sm text-gray-light-2 bg-primary p-4 rounded-2xl 
            rounded-tl-none relative before:absolute before:top-[-8px] before:left-0 
            before:h-4 before:w-8 before:bg-primary before:skew-y-[32deg] 
            before:rotate-[-8deg] w-auto max-w-[300px] min-h-[32px]"
        >
          {msg.message}
        </p>
      </div>
    </Fragment>
  );
};
