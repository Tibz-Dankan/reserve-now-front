import { Fragment } from "react";
import { SearchRooms } from "../../modules/room/UI/SearchRooms";
import { UniqueRoomTypes } from "../../modules/room/UI/UniqueRoomTypes";
import { Reviews } from "../../modules/review/UI/Reviews";
import { Footer } from "../../shared/layouts/Footer";
import { ScrollToTop } from "../../shared/UI/ScrollToTop";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../modules/auth/layouts/AuthLayout";
import { RoomsTable } from "../../modules/room/UI/RoomsTable";

export const Home = () => {
  return (
    <Fragment>
      <div className="min-h-[100vh]">
        <header className="text-gray-light-2">
          <nav className="bg-primary flex items-center justify-between px-6 py-4">
            <span>ReserveNow</span>
            <ul className="flex items-center gap-x-6">
              <li>
                <Link to="#">Rooms</Link>
              </li>
              <li>
                <Link to="#">Services</Link>
              </li>
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <AuthLayout label="signup" />
              </li>
              <li>
                <AuthLayout label="signin" />
              </li>
            </ul>
          </nav>
          <div className="bg-gray-light-2 h-[70vh]"></div>
        </header>
        <SearchRooms />
        <RoomsTable />
        <UniqueRoomTypes />
        <Reviews />
        <Footer />
        <ScrollToTop />
      </div>
    </Fragment>
  );
};
