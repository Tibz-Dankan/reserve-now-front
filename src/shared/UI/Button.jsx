import React, { Fragment } from "react";

export const Button = (props) => {
  return (
    <Fragment>
      <button
        className={`${props.className} w-full h-9 bg-primary text-gray-light-1 rounded uppercase font-bold`}
        type={props.type}
      >
        {props.children}
      </button>
    </Fragment>
  );
};
