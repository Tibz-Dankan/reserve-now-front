import React, { Fragment } from "react";
import { Button } from "../../../shared/UI/Button";
import roomImage from "../../../assets/Images/room1.png";
import { useSelector } from "react-redux";
import { addCommasToNumber } from "../../../shared/utils/addCommasToNumber";
import { timeToCome } from "../../../shared/utils/timeToCome";

export const AddBooking = () => {
  const booking = useSelector((state) => state.booking.newBooking);
  console.log("booking", booking);

  const date = (date) => new Date(date).toDateString();
  const numOfGuests =
    booking.numOfGuests?.adults + booking.numOfGuests?.children;

  // making request here
  return (
    <Fragment>
      <div className="pt-4 p-8 text-gray-dark-3 space-y-3 relative pb-20">
        <div
          className="bg-gray-light-3 p-2 rounded inline-block 
              font-normal border-[1px] border-gray-opacity shadow-sm"
        >
          <p>
            <span>Starts</span>
            {/* <span className="ml-2">{"2"} days</span> */}
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
                    // src={room.images[0].url}
                    src={roomImage}
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
              {booking.priceCurrency} {addCommasToNumber(booking.totalPrice)}
            </span>
          </p>
        </div>
        <div
          className="border-t-[1px] border-gray-opacity p-4 sm:px-8 absolute bottom-0 
               right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg rounded-br-lg"
        >
          {/* {!isLoading && ( */}
          <Button type="submit" className="rounded-md font-bold">
            Book
          </Button>
          {/* )} */}
          {/* {isLoading && <Loader label="Booking" className="w-36" />} */}
        </div>
      </div>
    </Fragment>
  );
};
