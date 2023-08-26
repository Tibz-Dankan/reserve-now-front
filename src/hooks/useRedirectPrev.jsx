import React, { Fragment } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDetectReload } from "./useDetectReload";

export const useRedirectPrev = () => {
  // const navigate = useNavigate();
  const { isReload } = useDetectReload();

  const path = window.location.pathname;
  // console.log("path");
  // console.log(path);

  // let history = window.history.back()

  const redirectPrev = () => {
    if (isReload) {
      // navigate(path, { replace: true });
      // history.back();
      // return <Navigate to={path} />;
      return <Navigate to="/rooms" />;
    }
  };

  return { redirectPrev };
};
