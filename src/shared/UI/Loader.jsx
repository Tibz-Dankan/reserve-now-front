import React, { Fragment } from "react";

export const Loader = () => {
  return (
    <Fragment>
      <div
        className="h-9 bg-primary rounded relative before:border-4
         before:border-solid before:border-gray-light-4 before:border-r-4
       before:border-r-gray-light-1 before:w-[24px] before:h-[24px]
         before:rounded-[50%] before:absolute before:top-[5px] before:left-[48%] 
         before:animate-rotate"
      ></div>
    </Fragment>
  );
};
