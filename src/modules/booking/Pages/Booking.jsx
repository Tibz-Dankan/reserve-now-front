import React, { Fragment } from "react";
import { Modal } from "../../../shared/UI/Modal";
import { MasterLayout } from "../../../shared/layouts/MasterLayout";

export const Booking = () => {
  return (
    <Fragment>
      <MasterLayout title="Booking">
        <div>
          <span>Booking</span>
          <Modal openModalElement={<button>Open booking modal</button>}>
            This is the booking modal content
          </Modal>
        </div>
      </MasterLayout>
    </Fragment>
  );
};
