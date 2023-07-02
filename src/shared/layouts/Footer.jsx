import React, { Fragment } from "react";

export const Footer = () => {
  return (
    <Fragment>
      <footer>&copy; Reserve Now {new Date().getFullYear()}</footer>
    </Fragment>
  );
};
