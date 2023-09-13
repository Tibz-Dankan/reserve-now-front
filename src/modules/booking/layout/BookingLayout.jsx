import React, { Fragment, useEffect } from "react";
import { Modal } from "../../../shared/UI/Modal";
import { Button } from "../../../shared/UI/Button";
import { ProgressBar } from "../../../shared/UI/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { AddBooking } from "../UI/AddBooking";

export const BookingLayout = () => {
  const bookingStage = useSelector((state) => state.booking.bookingStage);
  const booking = useSelector((state) => state.booking.newBooking);

  const stageLabelList = [
    {
      label: "Book",
      stage: 1,
    },
    {
      label: "Payments",
      stage: 2,
    },
    {
      label: "Confirm",
      stage: 3,
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-end">
        <Modal
          openModalElement={
            <Button className="inline-block mr-4" type="button">
              Continue
            </Button>
          }
          onModalClose={() => {}}
          className="top-8"
        >
          <div
            className="flex items-center justify-start border-b-[1px]
           border-gray-opacity"
          >
            <p className="text-gray-dark-3  text-xl p-4 sm:pl-8 self-start">
              <span> Make booking</span>
              {booking?.bookingId && (
                <span className="ml-1">({booking?.bookingId})</span>
              )}
            </p>
          </div>
          <ProgressBar
            stageNum={3}
            stageLabelList={stageLabelList}
            currentStage={bookingStage}
            className="mt-8 mb-0 bg-green-500s"
          />
          {bookingStage === 1 && <AddBooking />}
        </Modal>
      </div>
    </Fragment>
  );
};
