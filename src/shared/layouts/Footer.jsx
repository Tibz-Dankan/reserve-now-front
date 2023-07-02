import React, { Fragment } from "react";

export const Footer = () => {
  return (
    <Fragment>
      <footer className="flex justify-center items-center p-4">
        &copy; Reserve Now {new Date().getFullYear()}. All rights reserved
      </footer>
    </Fragment>
  );
};
