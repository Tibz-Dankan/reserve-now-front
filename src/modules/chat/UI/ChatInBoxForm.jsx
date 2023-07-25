import { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { Button } from "../../../shared/UI/Button";

export const ChatInBoxForm = () => {
  // TODO: update redux store upon submitting
  // TODO: form submit handler
  return (
    <Fragment>
      <form>
        <div
          className="flex items-center justify-center border-y-[1px] border-gray-light-3
             p-4 gap-x-4"
        >
          <input
            type="text"
            className="h-9 w-[80%]  border-[2px] border-gray-dark-2 outline-none
           focus:border-primary transition-transform rounded"
          />
          <svg className="w-[24px] h-[24px] fill-gray-dark-1">
            <use href={`${sprite}#icon-chevron-up`}></use>
          </svg>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-x-2">
            <svg className="w-[24px] h-[24px] fill-gray-dark-2 cursor-pointer">
              <use href={`${sprite}#icon-attach-file`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-gray-dark-2 cursor-pointer">
              <use href={`${sprite}#icon-gif`}></use>
            </svg>
            <svg className="w-[24px] h-[24px] fill-gray-dark-2 cursor-pointer">
              <use href={`${sprite}#icon-emoji`}></use>
            </svg>
          </div>
          <Button>Send</Button>
        </div>
      </form>
    </Fragment>
  );
};
