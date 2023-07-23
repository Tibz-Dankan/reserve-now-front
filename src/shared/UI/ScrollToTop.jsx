import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";

export const ScrollToTop = () => {
  const scrollToTop = () => {
    const header = document.querySelector("header");
    header.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <div className="relative">
        <div
          className="w-10 h-10 flex items-center justify-center bg-primary-dark
            rounded-[50%] border-[1px] border-primary absolute left-4 bottom-4
            hover:bg-primary transition-transform cursor-pointer"
          onClick={scrollToTop}
        >
          <svg className="w-[24px] h-[24px] text-gray-light-3">
            <use href={`${sprite}#icon-arrow-up`}></use>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};
