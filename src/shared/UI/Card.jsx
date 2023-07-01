import React from "react";

export const Card = (props) => {
  return (
    <div className={`p-3 shadow-lg rounded-xl  ${props.className}`}>
      {props.children}
    </div>
  );
};
