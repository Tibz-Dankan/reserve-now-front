import { Fragment } from "react";
import { SearchRooms } from "../../modules/room/UI/SearchRooms";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Fragment>
      <div className="min-h-[100vh] mb-24">
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
                <Link to="signup">SignUp</Link>
              </li>
              <li>
                <Link to="signin">SignIn</Link>
              </li>
            </ul>
          </nav>
          <div className="bg-gray-light-2 h-[70vh]"></div>
        </header>
        <SearchRooms />
        {/* Several sections here */}
        <footer className="h-[350px]">
          <span>Footer</span>
        </footer>
      </div>
    </Fragment>
  );
};
