import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";

export const ScrollToBottom = (props) => {
  const scrollToTop = () => {
    const scrollableElement = document.querySelector(props.elementId);
    scrollableElement.scrollTop = scrollableElement.scrollHeight;
  };

  return (
    <Fragment>
      <div className="relative">
        <div
          className="w-10 h-10 flex items-center justify-center bg-primary-dark
            rounded-[50%] border-[1px] border-primary absolute right-2 bottom-4
            hover:bg-primary transition-transform cursor-pointer"
          onClick={scrollToTop}
        >
          <svg className="w-[24px] h-[24px] fill-gray-light-3">
            <use href={`${sprite}#icon-arrow-down`}></use>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};
