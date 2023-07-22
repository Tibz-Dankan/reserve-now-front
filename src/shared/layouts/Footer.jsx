import React, { Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Fragment>
      <footer
        className="flex flex-col justify-center items-center bg-primary-dark
       text-gray-light-3 mt-16"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4
          px-8  py-16"
        >
          <div className="shadow-xl border-[1px] border-primary rounded-lg p-4">
            <span className="text-lg uppercase font-bold">About us</span>
            <p className="mt-4">
              Discover our hotel, where comfort meets culinary delights!
              Experience cozy rooms, savor delectable dishes at our restaurant,
              and indulge in exceptional room services and delicious food.
            </p>
          </div>
          <div className="shadow-xl border-[1px] border-primary rounded-lg p-4">
            <span className="text-lg uppercase font-bold">Rooms/Services</span>
            <ul className="mt-[10px] space-y-[-8px]">
              <li className="flex items-center">
                <svg className="w-[36px] h-[36px] fill-gray-light-3">
                  <use href={`${sprite}#icon-bullet`}></use>
                </svg>
                <span>Deluxe King Room</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[36px] h-[36px] fill-gray-light-3">
                  <use href={`${sprite}#icon-bullet`}></use>
                </svg>
                <span>Executive Suite</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[36px] h-[36px] fill-gray-light-3">
                  <use href={`${sprite}#icon-bullet`}></use>
                </svg>
                <span>Family Room</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[36px] h-[36px] fill-gray-light-3">
                  <use href={`${sprite}#icon-bullet`}></use>
                </svg>
                <span>24/7 in-room dining</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[36px] h-[36px] fill-gray-light-3">
                  <use href={`${sprite}#icon-bullet`}></use>
                </svg>
                <span>Restaurant with a diverse menu</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[36px] h-[36px] fill-gray-light-3">
                  <use href={`${sprite}#icon-bullet`}></use>
                </svg>
                <span>Daily breakfast buffet</span>
              </li>
            </ul>
          </div>
          <div className="shadow-xl border-[1px] border-primary rounded-lg p-4">
            <span className="text-lg uppercase font-bold">Follow us</span>
            <ul className="grid grid-cols-3 gap-y-8 mt-4">
              <li className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-primary">
                <Link to="instagram.com">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-instagram`}></use>
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-primary">
                <Link to="facebook.com">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-facebook`}></use>
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-primary">
                <Link to="twitter.com">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-twitter`}></use>
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-primary">
                <Link to="youtube.com">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-youtube`}></use>
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-primary">
                <Link to="linkedin.com">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-linkedin`}></use>
                  </svg>
                </Link>
              </li>
              <li className="flex items-center justify-center w-10 h-10 rounded-[50%] bg-primary">
                <Link to="whatsapp.com">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-whatsapp`}></use>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <div className="shadow-xl border-[1px] border-primary rounded-lg p-4">
            <span className="text-lg uppercase font-bold ">Contact</span>
            <ul className="mt-4 space-y-1">
              <li className="flex items-center">
                <svg className="w-[24px] h-[24px] fill-gray-light-3">
                  <use href={`${sprite}#icon-location`}></use>
                </svg>
                <span className="ml-2">20Km from Entebbe road</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[24px] h-[24px] fill-gray-light-3">
                  <use href={`${sprite}#icon-call`}></use>
                </svg>
                <span className="ml-2">+256 7XXXXXXX</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[24px] h-[24px] fill-gray-light-3">
                  <use href={`${sprite}#icon-email`}></use>
                </svg>
                <span className="ml-2">support@reservenow.com</span>
              </li>
              <li className="flex items-center">
                <svg className="w-[24px] h-[24px] fill-gray-light-3">
                  <use href={`${sprite}#icon-whatsapp`}></use>
                </svg>
                <span className="ml-2">+256 7XXXXXXX</span>
              </li>
              <Link to="/chat">
                <li className="flex items-center">
                  <svg className="w-[24px] h-[24px] fill-gray-light-3">
                    <use href={`${sprite}#icon-chat`}></use>
                  </svg>
                  <span className="ml-2">Real-time chat</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div
          className="flex flex-col items-center md:flex-row md:justify-between mb-8 border-t-[1px]
        border-gray-light-2 w-full p-6 "
        >
          <p className="my-2 ">
            <span
              className="pr-2 relative after:absolute after:right-0 after:top-0 after:h-full 
              after:w-[2px] after:bg-gray-light-3"
            >
              &copy; Reserve Now {new Date().getFullYear()}
            </span>
            <span className="pl-2">All rights reserved</span>
          </p>
          <ul className="flex items-center gap-x-2 my-2 ">
            <li
              className="pr-2 relative after:absolute after:right-0 after:bottom-0
               after:h-[90%] after:w-[2px] after:bg-gray-light-3"
            >
              <Link to="/login">Login</Link>
            </li>
            <li
              className="pr-2 relative after:absolute after:right-0 after:bottom-0
               after:h-[90%] after:w-[2px] after:bg-gray-light-3"
            >
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </footer>
    </Fragment>
  );
};
