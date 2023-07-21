import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Fragment>
      <footer
        className="flex flex-col justify-center items-center bg-primary-dark
       text-gray-light-2 mt-16"
      >
        <div className="grid grid-cols-4 p-8">
          <div>
            <span>About us</span>
            <p>
              Discover our hotel, where comfort meets culinary delights!
              Experience cozy rooms, savor delectable dishes at our restaurant,
              and indulge in exceptional room services and delicious food.
            </p>
          </div>
          <div>
            <span>Rooms/Services</span>
            <ul>
              <li>Deluxe King Room</li>
              <li>Executive Suite</li>
              <li>Family Room</li>
              <li>24/7 in-room dining</li>
              <li>Restaurant with a diverse menu</li>
              <li>Daily breakfast buffet</li>
            </ul>
          </div>
          <div>
            <span>Follow us</span>
            <ul>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
              <li>
                <Link to="facebook.com">fb icon</Link>
              </li>
            </ul>
          </div>
          <div>
            <span>Contact</span>
            <ul>
              <li>
                <span>svg icon</span>
                <span>20Km from Entebbe road</span>
              </li>
              <li>
                <span>svg icon</span>
                <span>+256 7XXXXXXX</span>
              </li>
              <li>
                <span>svg icon</span>
                <span>support@reservenow.com</span>
              </li>
              <li>
                <span>svg icon</span>
                <span>+256 7XXXXXXX</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pb-8 border-t-[1px] border-gray-light-1  w-full p-8">
          <span>
            &copy; Reserve Now {new Date().getFullYear()}. All rights reserved
          </span>
          <ul className="flex items-center gap-2 ">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
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
