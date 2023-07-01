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
      className={`${bgColor} text-lg z-50 fixed top-5 right-5 flex items-center rounded w-72`}
    >
      <svg
        className="w-3 h-3 fill-white absolute right-4 top-1"
        onClick={props.onClose}
      >
        <use href={`${sprite}#icon-cross`}></use>
      </svg>
      <div className="pt-3">
        <svg className="grid place-items-center ">
          <use href={`${sprite}#icon-${icon}`}></use>
        </svg>
      </div>
      <div className="flex items-center p-1 mt-1 ml-2 max-w-[230] text-white">
        <span className="text-sm"> {props.message}</span>
      </div>
    </Card>
  );
};
