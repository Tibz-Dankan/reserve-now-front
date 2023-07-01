import React, { Fragment, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { authenticate } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "./store";
// import { Alert } from "@mui/material";
import { Home } from "./common/pages/Home";
import { SignIn } from "./modules/auth/pages/Signin";
import { SignUp } from "./modules/auth/pages/SignUp";
import { Booking } from "./modules/booking/Pages/Booking";
import { Notification } from "./shared/UI/Notification";
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

  const nonAuthRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/signin",
      element: (
        <div>
          {/* {notification.showAlert && (
            <Alert
              severity={notification.alertType}
              onClose={closeAlertHandler}
              style={{ zIndex: 1000000 }}
            >
              <span className="inline text-base mx-0 my-auto">
                {notification.alertMessage}
              </span>
            </Alert>
          )} */}
          {notification.showCardNotification && (
            <Notification
              type={notification.cardNotificationType}
              title={notification.cardNotificationTitle}
              message={notification.cardMessage}
              onClose={closeCardHandler}
            />
          )}
          <SignIn />,
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          {/* {notification.showAlert && (
            <Alert
              severity={notification.alertType}
              onClose={closeAlertHandler}
              style={{ zIndex: 1000000 }}
            >
              <span className="inline text-base mx-0 my-auto">
                {notification.alertMessage}
              </span>
            </Alert>
          )} */}
          {notification.showCardNotification && (
            <Notification
              type={notification.cardNotificationType}
              title={notification.cardNotificationTitle}
              message={notification.cardMessage}
              onClose={closeCardHandler}
            />
          )}
          <SignUp />,
        </div>
      ),
    },
    {
      path: "/login",
      element: <Navigate to="/signin" />,
    },
    {
      path: "/register",
      element: <Navigate to="/signup" />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  const authRouter = createBrowserRouter([
    {
      path: "/",
      element: <Booking />,
    },
    {
      path: "/booking",
      element: <Booking />,
    },
    {
      path: "*",
      element: <Booking />,
    },
  ]);

  return (
    <Fragment>
      <div className="bg-green-500">
        {!isLoggedIn && <RouterProvider router={nonAuthRouter} />}
        {isLoggedIn && <RouterProvider router={authRouter} />}
      </div>
    </Fragment>
  );
};
