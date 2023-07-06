import React, { Fragment } from "react";
import { Modal } from "../../../shared/UI/Modal";
import { MasterLayout } from "../../../shared/layouts/MasterLayout";
import { SearchRooms } from "../../room/UI/SearchRooms";

export const Booking = () => {
  return (
    <Fragment>
      <MasterLayout title="Booking">
        <div>
          <SearchRooms />
        </div>
      </MasterLayout>
    </Fragment>
  );
};
