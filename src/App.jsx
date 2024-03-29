import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authenticate } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "./store";
import { io } from "socket.io-client";
import { Home } from "./common/pages/Home";
import { Booking } from "./modules/booking/Pages/Booking";
import { Notification } from "./shared/UI/Notification";
import { Rooms } from "./modules/room/pages/Rooms";
import { Chat } from "./modules/chat/pages/Chat";
import { socketUrl } from "./store";
// import { useDetectReload } from "./hooks/useDetectReload";
// import { useRedirectPrev } from "./hooks/useRedirectPrev";
import "./App.css";

export const App = () => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.isLoggedIn;
  const socket = io.connect(socketUrl);
  const dispatch = useDispatch();

  // const { isReload } = useDetectReload();
  // console.log("isReload");
  // console.log(isReload);
  // const { redirectPrev } = useRedirectPrev();
  // redirectPrev();

  const notification = useSelector((state) => state.notification);

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

  // TODO: if user reloads redirect when loggedIn,
  // redirect them to the page before reload

  return (
    <Fragment>
      <div className="bg-gray-light-1 text-base overflow-x-hidden">
        <BrowserRouter>
          {!isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route path="/" element={<Home />} />
                {/* TODO: build logic to cater to for login and signup */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Fragment>
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
                <Route path="chat" element={<Chat socket={socket} />} />
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
