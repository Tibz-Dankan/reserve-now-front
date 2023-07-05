import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authenticate } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "./store";
// import { Alert } from "@mui/material";
import { Home } from "./common/pages/Home";
import { SignIn } from "./modules/auth/pages/Signin";
import { SignUp } from "./modules/auth/pages/SignUp";
import { Booking } from "./modules/booking/Pages/Booking";
import { Notification } from "./shared/UI/Notification";
import { Rooms } from "./modules/room/pages/Rooms";
import "./App.css";

export const App = () => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.isLoggedIn;

  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  console.log("notification");
  console.log(notification);

  const closeAlertHandler = () => {
    dispatch(notificationActions.hideAlert());
  };
  const closeCardHandler = () => {
    dispatch(notificationActions.hideCardNotification());
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
      dispatch(notificationActions.hideAlert());
    }, [4000]);
  }, [dispatch]);

  useEffect(() => {
    const tryLogin = async () => {
      const strAuthData = localStorage.getItem("auth");
      const parsedAuthData = JSON.parse(strAuthData);

      if (!parsedAuthData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, token, expiresIn, expirationTime, isLoggedIn } =
        parsedAuthData;
      if (!user || !token) {
        localStorage.clear();
        return <Navigate to="/" />;
      }
      // TODO: to convert expirationTime into browser's time zone
      const expiryTime = new Date(expirationTime);
      const currentTime = new Date(Date.now());
      const isExpired = expiryTime < currentTime;

      if (isExpired) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      await dispatch(authenticate(parsedAuthData));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="bg-gray-light-1 text-base">
        <BrowserRouter>
          {!isLoggedIn && (
            <Routes>
              <Fragment>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="signup"
                  element={
                    <div>
                      {notification.showCardNotification && (
                        <Notification
                          type={notification.cardNotificationType}
                          message={notification.cardMessage}
                          onClose={closeCardHandler}
                        />
                      )}
                      <SignUp />
                    </div>
                  }
                />
                <Route
                  path="signin"
                  element={
                    <div>
                      {notification.showCardNotification && (
                        <Notification
                          type={notification.cardNotificationType}
                          message={notification.cardMessage}
                          onClose={closeCardHandler}
                        />
                      )}
                      <SignIn />
                    </div>
                  }
                />
                <Route
                  path="register"
                  element={<Navigate to="/signup" replace />}
                />
                <Route
                  path="login"
                  element={<Navigate to="/signin" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Fragment>
            </Routes>
          )}

          {isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route path="/" element={<Booking />} />
                <Route path="booking" element={<Booking />} />
                <Route path="rooms" element={<Rooms />} />
                <Route path="*" element={<Navigate to="/booking" replace />} />
              </Routes>
            </Fragment>
          )}
        </BrowserRouter>
      </div>
    </Fragment>
  );
};
