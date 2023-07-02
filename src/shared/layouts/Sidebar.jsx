import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Fragment>
      <aside
        id="sidebar"
        className="bg-secondary-dark w-[256px] h-[100vh] fixed top-0 left-0"
      >
        <div
          className="px-4 py-[21.5px] w-full text-[20px] text-gray-light-2
            shadow-md mb-2 flex items-center justify-start relative"
        >
          <span className="ml-8 ">ReserveNow</span>
          <svg className="w-[20px] h-[20px] fill-gray-light-2 absolute right-5 top-[35%]">
            <use href={`${sprite}#icon-chevron-left`}></use>
          </svg>
        </div>
        <nav className=" text-gray-light-2 w-full ">
          {/* MAIN LINKS */}
          <ul className="border-b-[1px] border-gray-opacity pb-4 mb-4">
            <li>
              <Link to="/booking" className="px-4 py-2 flex items-center gap-8">
                <svg className="w-[30px] h-[30px] fill-gray-light-2">
                  <use href={`${sprite}#icon-booking`}></use>
                </svg>
                <span>Booking</span>
              </Link>
            </li>
            <li>
              <Link to="/chat" className="px-4 py-2 flex items-center gap-8">
                <svg className="w-[30px] h-[30px] fill-gray-light-2">
                  <use href={`${sprite}#icon-chat`}></use>
                </svg>
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <Link to="/rooms" className="px-4 py-2 flex items-center gap-8">
                <svg className="w-[30px] h-[30px] fill-gray-light-2">
                  <use href={`${sprite}#icon-booking`}></use>
                </svg>
                <span>Rooms</span>
              </Link>
            </li>
            <li>
              <Link to="/billing" className="px-4 py-2 flex items-center gap-8">
                <svg className="w-[30px] h-[30px] fill-gray-light-2">
                  <use href={`${sprite}#icon-billing`}></use>
                </svg>
                <span>Billing</span>
              </Link>
            </li>
          </ul>
          {/* SECONDARY LINKS */}
          <ul>
            <li>
              <Link
                to="/notification"
                className="px-4 py-2 flex items-center gap-8"
              >
                <svg className="w-[30px] h-[30px] fill-gray-light-2">
                  <use href={`${sprite}#icon-notification`}></use>
                </svg>
                <span>Notification</span>
              </Link>
            </li>
            <li>
              <Link to="/account" className="px-4 py-2 flex items-center gap-8">
                <svg className="w-[30px] h-[30px] fill-gray-light-2">
                  <use href={`${sprite}#icon-account`}></use>
                </svg>
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </Fragment>
  );
};
