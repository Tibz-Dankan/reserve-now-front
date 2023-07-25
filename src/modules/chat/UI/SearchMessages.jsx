import { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const SearchMessages = () => {
  // automatic triggering of search actions
  //   With aid of useEffect
  return (
    <Fragment>
      <form
        className="p-4 py-8 border-b-[1px] border-gray-light-3 flex
        items-center justify-center relative"
      >
        <svg
          className="w-[18px] h-[18px] fill-gray-dark-2 absolute 
             top-10 left-14"
        >
          <use href={`${sprite}#icon-search`}></use>
        </svg>
        <input
          type="search"
          className="h-9 w-[90%]  border-[2px] border-gray-dark-2 outline-none
           focus:border-primary transition-transform rounded"
        />
      </form>
    </Fragment>
  );
};
