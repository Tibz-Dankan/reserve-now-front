import React from "react";
import { Card } from "./Card";
import sprite from "../../assets/icons/sprite.svg";

export const Notification = (props) => {
  const type = props.type;
  let bgColor;
  let icon;

  if (type === "success") {
    icon = "check-circle";
    bgColor = "bg-green-500";
  } else if (type === "error") {
    icon = "cancel-circle";
    bgColor = "bg-red-500";
  } else if (type === "info") {
    icon = "info";
    bgColor = "bg-blue-500";
  } else if (type === "warning") {
    icon = "warning";
    bgColor = "bg-yellow-400";
  } else {
    icon = "info";
    bgColor = "bg-blue-500";
  }

  return (
    <Card
      className={`${bgColor} text-lg z-50 fixed top-5  right-5 flex items-center rounded w-72 animate-slideDown`}
    >
      <svg
        className="w-3 h-3 fill-white absolute right-2 top-2"
        onClick={props.onClose}
      >
        <use href={`${sprite}#icon-cross`}></use>
      </svg>
      <div className="p-[10px] self-center">
        <svg className="w-[30px] h-[30px] fill-white">
          <use href={`${sprite}#icon-${icon}`}></use>
        </svg>
      </div>
      <div className="flex flex-col items-center p-[2px] mt-[2px] ml-2 max-w-[230px] text-white">
        <span>{props.title}</span>
        <span className="text-sm"> {props.message}</span>
      </div>
    </Card>
  );
};
