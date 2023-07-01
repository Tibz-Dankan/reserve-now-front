import React, { Fragment } from "react";
import { Modal } from "../../../shared/UI/Modal";

export const Booking = () => {
  return (
    <Fragment>
      <div>
        <span>Booking</span>
        <Modal openModalElement={<button>Open booking modal</button>}>
          This is the booking modal content
        </Modal>
      </div>
    </Fragment>
  );
};
