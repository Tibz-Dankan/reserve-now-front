import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export const Button = (props) => {
  return (
    <Fragment>
      <button
        className={twMerge(
          "h-9 bg-primary text-gray-light-1 rounded px-3",
          props.className
        )}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled ? props.disabled : false}
      >
        {props.children}
      </button>
    </Fragment>
  );
};
