import React, { Fragment } from "react";
import { Button } from "../../../shared/UI/Button";

export const NotSignedIn = (props) => {
  const updateAuthLabel = (label) => {
    props.onUpdateLabel(label);
  };
  return (
    <Fragment>
      <div className="p-8 text-gray-dark-3">
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Not signed in</h1>
          <p>Please sign in to continue</p>
        </div>
        <p className="mb-2">Click to the button below to proceed</p>
        <Button className="font-bold" onClick={() => updateAuthLabel("signin")}>
          Continue
        </Button>
      </div>
    </Fragment>
  );
};
