import React, { Fragment, useState, useEffect, useRef } from "react";
import { Modal } from "../../../shared/UI/Modal";
import { SignIn } from "../UI/signIn";
import { SignUp } from "../UI/SignUp";
import { NotSignedIn } from "../UI/NotSignedIn";
import { PersonPlaceHolder } from "../UI/PersonPlaceHolder";
import { firstLetterToUppercase } from "../../../shared/utils/firstLetterToUppercase";

export const AuthLayout = (props) => {
  const [label, setLabel] = useState(props?.label ? props.label : "signin");

  const defaultLabel = props?.label;
  const [propsLabel, setPropsLabel] = useState(props?.label);
  const [modalClosed, setModalClosed] = useState(false);

  const modalCloseHandler = (modalState) => {
    if (modalState) {
      setModalClosed((modalState) => !modalState);
    }
  };

  const labelHandler = (label) => {
    console.log("Label updated from the child component");
    console.log(label);
    setLabel(label);
  };

  const auths = [
    {
      label: "signin",
      component: <SignIn onUpdateLabel={labelHandler} />,
    },
    {
      label: "signup",
      component: <SignUp onUpdateLabel={labelHandler} />,
    },
    {
      label: "continue",
      component: <NotSignedIn onUpdateLabel={labelHandler} />,
    },
  ];

  // useEffect(() => {
  //   return () => {
  //     console.log("Unmounting");
  //     console.log("label on closing the modal");
  //     console.log(propsLabel);
  //     setLabel(propsLabel);
  //   };
  // }, []);

  useEffect(() => {
    setLabel(defaultLabel);

    return () => {
      setLabel(defaultLabel);
    };
  }, [modalClosed, setLabel, defaultLabel]);

  return (
    <Fragment>
      <Modal
        openModalElement={
          <span className="cursor-pointer">
            {firstLetterToUppercase(label)}
          </span>
        }
        onModalClose={modalCloseHandler}
        className="fixed top-[15vh] left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[540px] md:left-[15%] md:w-[540px] xl:left-[20%] xl:w-[540px] transition-all"
      >
        <div className="sm:w-full relative">
          {auths.map((auth) => {
            return (
              <div key={auth.label}>
                {auth.label === label && auth.component}
              </div>
            );
          })}
          <PersonPlaceHolder />
        </div>
      </Modal>
    </Fragment>
  );
};
