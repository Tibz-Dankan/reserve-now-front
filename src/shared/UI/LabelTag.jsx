import React, { Fragment } from "react";

export const LabelTag = (props) => {
  return (
    <Fragment>
      <div
        className="bg-primary-dark text-gray-light-2 inline-block
         px-4 py-2 text-sm rounded-3xl"
      >
        {props.children}
      </div>
    </Fragment>
  );
};
