import React, { Fragment, useState, useRef } from "react";
import sprite from "../../assets/icons/sprite.svg";

// const DropDownOverlay = ({ onClose }) => {
//   return (
//     <div
//       className="fixed top-0 left-0 w-full h-full bg-gray-300 opacity-60 z-30"
//       onClick={() => onClose()}
//     />
//   );
// };

const DropDownContent = ({ ref, className, content, onClose }) => {
  return (
    <div
      className={`${className} p-2  rounded z-40 bg-gray-light-1 shadow-2xl animate-slideDown`}
      ref={ref}
    >
      {content}
    </div>
  );
};

export const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  //   const onOpenHandler = () => setIsOpen(true);
  //   const onCloseHandler = () => setIsOpen(false);
  //   if (!isOpen) {
  //     return (
  //       <div onClick={() => onOpenHandler()}>{props.openDropDownElement}</div>
  //     );
  //   }

  const contentRef = useRef();
  const openDropDownRef = useRef();

  window.addEventListener("click", (event) => {
    if (
      event.target !== contentRef.current &&
      event.target !== openDropDownRef.current
    ) {
      setIsOpen(false);
    }
  });

  return (
    <Fragment>
      <div>
        <div ref={openDropDownRef} onClick={() => setIsOpen(!isOpen)}>
          {props.openDropDownElement}
        </div>
        {isOpen && (
          <div
            className={`${props.className} w-auto h-auto p-2  rounded z-40 bg-green-400 shadow-2xl animate-slideDown`}
            ref={contentRef}
            // onClick={() => setIsOpen(!isOpen)}
          >
            {props.children}
          </div>
        )}
      </div>
    </Fragment>
  );
};
