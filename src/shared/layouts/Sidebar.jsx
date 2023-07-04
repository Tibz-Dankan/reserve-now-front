import React, { Fragment, useEffect } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";
import {
  closeSidebar,
  autoCloseSidebar,
  autoOpenSidebar,
  layoutElements,
} from "../../store/actions/sidebar";

import { useDispatch, useSelector } from "react-redux";

export const Sidebar = () => {
  const isOpenSidebar = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const closeSidebarHandler = () => dispatch(closeSidebar());

  useEffect(() => {
    const setDefaultSidebarVisibility = () => {
      const layout = layoutElements();
      const mediumScreenWidth = "768px";
      const windowWidth = window.innerWidth;

      if (windowWidth > mediumScreenWidth) {
        layout.sidebar.style.left = "0px";
        layout.headerMainFooter.style.marginLeft = "256px";
      } else {
        layout.sidebar.style.left = "-256px";
        layout.headerMainFooter.style.marginLeft = "0px";
      }
      console.log("set sidebar default view");
    };
    setDefaultSidebarVisibility();
  }, []);

  useEffect(() => {
    const widthResizeHandler = () => {
      const isBelow768px = window.matchMedia("(max-width: 768px)").matches;
      const isAbove768px = window.matchMedia("(min-width: 768px)").matches;
      if (isOpenSidebar && isBelow768px) {
        dispatch(autoCloseSidebar());
      }
      if (!isOpenSidebar && isAbove768px) {
        dispatch(autoOpenSidebar());
      }
    };
    window.addEventListener("resize", widthResizeHandler);

    return () => window.removeEventListener("resize", widthResizeHandler);
  }, [window.innerWidth, isOpenSidebar, dispatch]);

  return (
    <Fragment>
      <aside
        id="sidebar"
        className="bg-primary-dark w-[256px] h-[100vh] fixed top-0"
      >
        <div
          className="px-4 py-[21.5px] w-full text-[20px] text-gray-light-2
            shadow-md mb-2 flex items-center justify-start relative"
        >
          <span className="ml-8 ">ReserveNow</span>
          <svg
            className="w-[20px] h-[20px] fill-gray-light-2 absolute right-5 top-[35%]"
            onClick={() => closeSidebarHandler()}
          >
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
