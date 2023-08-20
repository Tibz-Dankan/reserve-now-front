import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";

export const IconButton = (props) => {
  return (
    <Fragment>
      <button
        className={`${props.className} flex justify-center items-center 
         w-full h-9 bg-primary text-gray-light-1 rounded px-4 gap-x-4`}
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
      >
        <svg className={`${props.iconClass}`}>
          <use href={`${sprite}#icon-${props.icon}`}></use>
        </svg>
        <span>{props.label}</span>
      </button>
    </Fragment>
  );
};
