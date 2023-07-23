import React from "react";
import { ReduxProvider } from "./ReduxProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

export const AppProviders = (props) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{props.children}</ReactQueryProvider>
    </ReduxProvider>
  );
};
