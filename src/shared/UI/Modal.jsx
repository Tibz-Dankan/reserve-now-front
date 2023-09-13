import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import sprite from "../../assets/icons/sprite.svg";

const ModalOverlay = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-60 z-30"
      onClick={() => onClose()}
    />
  );
};
const ModalContent = ({ content, onClose, className }) => {
  return (
    <div
      className={`${className} fixed top-[10vh] left-[5%] w-[90%] md:left-[15%] 
          md:w-[70%] xl:left-[20%] xl:w-[60%] p-0  rounded-lg z-[1000] 
          bg-gray-light-1 shadow-2xl animate-slideDown`}
    >
      <svg
        className="w-[20px] h-[20px] fill-gray-dark-2 absolute right-4 top-4 z-[2000]"
        onClick={() => onClose()}
      >
        <use href={`${sprite}#icon-cross-small`}></use>
      </svg>
      {content}
    </div>
  );
};

export const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandler = () => setIsOpen(true);
  const onCloseHandler = () => setIsOpen(false);
  if (!isOpen) {
    return <div onClick={() => onOpenHandler()}>{props.openModalElement}</div>;
  }

  const onModalClose = () => {
    props.onModalClose(true);
  };

  const createAppendPortalElement = () => {
    const portalElement = document.createElement("div");
    portalElement.setAttribute("id", "portal");
    const body = document.body;
    body.appendChild(portalElement);
  };
  createAppendPortalElement();

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div>
          <ModalOverlay
            onClose={() => {
              onCloseHandler(), onModalClose();
            }}
          />
          <ModalContent
            content={props.children}
            onClose={() => {
              onCloseHandler(), onModalClose();
            }}
            className={props?.className}
          />
        </div>,
        document.getElementById("portal")
      )}
    </Fragment>
  );
};
