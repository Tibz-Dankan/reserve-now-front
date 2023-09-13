import React, { Fragment } from "react";
import { Button } from "../../../shared/UI/Button";
// import roomImage from "../../../assets/Images/room1.png";
import { useDispatch, useSelector } from "react-redux";
import { addCommasToNumber } from "../../../shared/utils/addCommasToNumber";
import { timeToCome } from "../../../shared/utils/timeToCome";
import { useMutation } from "@tanstack/react-query";
import { addBooking } from "../API";
import { updateNewBooking } from "../../../store/actions/booking";
import { Loader } from "../../../shared/UI/Loader";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { updateBookingStage } from "../../../store/actions/booking";

export const AddBooking = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const booking = useSelector((state) => state.booking.newBooking);
  console.log("booking", booking);
  const dispatch = useDispatch();

  const date = (date) => new Date(date).toDateString();

  const { isLoading, mutate, data } = useMutation({
    mutationFn: addBooking,
    onSuccess: (data) => {
      dispatch(updateNewBooking(data.data.newBooking));
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      dispatch(updateBookingStage(2));
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const addBookingHandler = () => {
    if (!userId || !token) return;

    const descriptors = Object.getOwnPropertyDescriptors(booking); //copy properties
    const bookingObj = Object.defineProperties({}, descriptors); //create mutable object with all properties

    bookingObj.userId = userId;
    bookingObj.token = token;

    mutate(bookingObj);
  };

  const numOfGuests =
    parseInt(booking.numOfGuests?.adults) +
    parseInt(booking.numOfGuests?.children);

  const roomImg = booking?.rooms[0]?.images[0]?.url;

  return (
    <Fragment>
      <div className="pt-4 p-8 text-gray-dark-3 space-y-3 relative pb-20">
        <div
          className="bg-gray-light-3 p-2 rounded inline-block 
              font-normal border-[1px] border-gray-opacity shadow-sm"
        >
          <p>
            <span>Starts</span>
            <span className="ml-2">{timeToCome(booking.checkInDate)}</span>
          </p>
          <p>
            <span>Check-in :</span>
            <span className="ml-2">{date(booking.checkInDate)}</span>
          </p>
          <p>
            <span>Check-out :</span>
            <span className="ml-2">{date(booking.checkOutDate)}</span>
          </p>
        </div>
        <div className="">
          <p className="mb-2">Room(s)</p>
          <div className="flex items-center justify-start gap-x-4">
            {booking.rooms.map((room, index) => {
              return (
                <div
                  className="flex flex-col items-start justify-start gap-x-4"
                  key={index}
                >
                  <img
                    src={roomImg}
                    alt="room interior"
                    className="bg-gray-light-3 w-20 h-16 rounded"
                  />
                  <span className="text-sm">{room.roomName}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-20">
          <p>
            <span>Number of guests :</span>
            <span className="ml-2">{numOfGuests}</span>
          </p>
          <p>
            <span>Total budget : </span>
            <span className="ml-2">
              {booking.price.currency} {addCommasToNumber(booking.price.total)}
            </span>
          </p>
        </div>
        <div
          className="border-t-[1px] border-gray-opacity p-4 sm:px-8 absolute bottom-0 
               right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg rounded-br-lg"
        >
          {!isLoading && (
            <Button
              className="rounded-md font-bold"
              onClick={() => addBookingHandler()}
            >
              Book
            </Button>
          )}
          {isLoading && <Loader label="Booking" className="w-36" />}
          {/* TODO: to add a button for cancelling the operation */}
        </div>
      </div>
    </Fragment>
  );
};
