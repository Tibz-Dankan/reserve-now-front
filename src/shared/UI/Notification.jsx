import React from "react";
import { Card } from "./Card";
import { BsCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { MdCancel, MdInfo, MdWarning } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";

export const Notification = (props) => {
  const type = props.type;
  let bgColor;

  const icon = () => {
    if (type === "success") {
      bgColor = "bg-green-500";
      return <BsCheckCircleFill />;
    } else if (type === "error") {
      bgColor = "bg-red-500";
      return <MdCancel />;
    } else if (type === "info") {
      bgColor = "bg-blue-500";
      return <MdInfo />;
    } else if (type === "warning") {
      bgColor = "bg-yellow-400";
      return <MdWarning />;
    } else {
      bgColor = "bg-blue-500";
      return <MdInfo />;
    }
  };
  icon();

  return (
    <Card
      className={`${bgColor} text-lg z-50 fixed top-5 right-5 flex items-center rounded w-72`}
    >
      <span
        className="w-3 h-3 fill-white absolute right-4 top-1"
        onClick={props.onClose}
      >
        <IconContext.Provider
          value={{ size: "20px", color: "hsl(0, 0%, 100%)" }}
        >
          <FaWindowClose />
        </IconContext.Provider>
      </span>
      <div className="pt-3">
        <span className="grid place-items-center ">
          <IconContext.Provider
            value={{ size: "20px", color: "hsl(0, 0%, 100%)" }}
          >
            {icon()}
          </IconContext.Provider>
        </span>
      </div>
      <div className="flex items-center p-1 mt-1 ml-2 max-w-[230] text-white">
        <span className="text-sm"> {props.message}</span>
      </div>
    </Card>
  );
};
