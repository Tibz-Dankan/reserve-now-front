import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { openSidebar } from "../../store/actions/sidebar";

import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/actions/auth";

export const Header = (props) => {
  const user = useSelector((state) => state.auth.user);
  const isOpenSidebar = useSelector((state) => state.sidebar.isOpen);

  const dispatch = useDispatch();

  const openSidebarHandler = () => dispatch(openSidebar());
  const logoutHandler = async () => await dispatch(logOut());

  return (
    <Fragment>
      <header
        className="flex items-center justify-between shadow-sm border-b-[1px] border-gray-opacity px-8 py-[16px] 
        sticky top-0 z-10 bg-gray-light-1"
      >
        <div className="flex items-center">
          {!isOpenSidebar && (
            <div className="flex items-center mr-4 w-full text-[18px] font-bold text-gray-dark-2">
              <svg
                className="w-[24px] h-[24px] fill-gray-dark-2 mr-4"
                onClick={() => openSidebarHandler()}
              >
                <use href={`${sprite}#icon-menu`}></use>
              </svg>
              <span>ReserveNow</span>
            </div>
          )}
          <div>
            <span className="bg-primary-light text-gray-dark-3 py-1 px-2 rounded-md border-b-4 border-primary">
              {props.title}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-8">
            <svg className="w-[24px] h-[24px] fill-gray-dark-3">
              <use href={`${sprite}#icon-notification`}></use>
            </svg>
          </div>
          <div className="flex items-center">
            <svg className="w-[30px] h-[30px] fill-gray-dark-3">
              <use href={`${sprite}#icon-person-circle`}></use>
            </svg>
            <span className="ml-2 mr-8">{user.name}</span>
          </div>
          <div>
            <svg
              className="w-[24px] h-[24px] fill-gray-dark-3"
              onClick={() => logoutHandler()}
            >
              <use href={`${sprite}#icon-sign-out-circle`}></use>
            </svg>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
