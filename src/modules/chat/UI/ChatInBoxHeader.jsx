import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const ChatInBoxHeader = () => {
  return (
    <Fragment>
      <div className="">
        <div
          className="flex items-center justify-between border-b-[1px]
             border-gray-light-3 px-3 py-1 gap-x-40"
        >
          <div className="">
            <p className="font-bold mb-[-4px]">John Doe</p>
            <p className="text-sm text-gray-700">Client</p>
          </div>
          <div className=" w-[96px] relative p-3">
            <svg className="w-[24px] h-[24px] fill-gray-dark-4 absolute top-0 left-0">
              <use href={`${sprite}#icon-audio-call`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-gray-dark-4 absolute top-0 right-[36px]">
              <use href={`${sprite}#icon-video-call`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-gray-dark-4 absolute top-0 right-0">
              <use href={`${sprite}#icon-dots-y`}></use>
            </svg>
          </div>
        </div>
        <div>
          <span>Online</span>
        </div>
      </div>
    </Fragment>
  );
};
