import React, { Fragment, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { authenticate } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "./common/pages/Home";
import { SignIn } from "./modules/auth/pages/Signin";
import "./App.css";

export const App = () => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.isLoggedIn;

  const dispatch = useDispatch();

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
      element: <SignIn />,
    },
    {
      path: "/login",
      element: <Navigate to="/signin" />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  // const authRouter = createBrowserRouter([
  //   {
  //     path: "/logged-path",
  //     element: <loogedInComponent />,
  //   },
  // ]);

  return (
    <Fragment>
      <div className="bg-green-500">
        {!isLoggedIn && <RouterProvider router={nonAuthRouter} />}
        {/* {isLoggedIn && <RouterProvider router={authRouter} />} */}
      </div>
    </Fragment>
  );
};
