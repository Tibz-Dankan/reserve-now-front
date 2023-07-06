import React, { Fragment } from "react";

export const Button = (props) => {
  return (
    <Fragment>
      <button
        className={`${props.className} h-9 bg-primary text-gray-light-1 rounded px-3`}
        type={props.type}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </Fragment>
  );
};
