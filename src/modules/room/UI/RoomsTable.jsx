import React, { Fragment, useState } from "react";
import { LabelTag } from "../../../shared/UI/LabelTag";
import { StarRating } from "../../review/UI/StarRating";
import sprite from "../../../assets/icons/sprite.svg";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../shared/UI/Button";
import { IconButton } from "../../../shared/UI/IconButton";
import { addCommasToNumber } from "../../../shared/utils/addCommasToNumber";
import { AuthLayout } from "../../auth/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { BookingLayout } from "../../booking/layout/BookingLayout";
import { updateNewBooking } from "../../../store/actions/booking";

export const RoomsTable = (props) => {
  const rooms = useSelector((state) => state.room.searchRoomResults?.rooms);
  const bookingNumberOfDays = useSelector(
    (state) => state.room.searchRoomResults?.bookingDates?.numberOfDays
  );
  const bookingDates = useSelector(
    (state) => state.room.searchRoomResults?.bookingDates
  );
  const numOfGuests = useSelector(
    (state) => state.room.searchRoomResults?.numOfGuests
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const roomsArrayLength = rooms?.length;

  if (!rooms[0]) return;

  const removeFromSelectedRooms = (roomIndex) => {
    setSelectedRooms((selectedRooms) => {
      return selectedRooms.filter((room, index) => index !== roomIndex);
    });
  };

  const onSelectRoomHandler = (room) => {
    setSelectedRooms((rooms) => [...rooms, room]);
  };

  const hasRoomBeenSelected = (candidateRoom) => {
    const room = selectedRooms.find((room) => {
      return room.id === candidateRoom.id;
    });
    if (room?.id) return true;
    return false;
  };

  const overallTotal = (selectRooms) => {
    const selectedTotalPrice = selectRooms.reduce(
      (overallTotal, room) => overallTotal + room.price?.total,
      0
    );
    return selectedTotalPrice;
  };

  const guestAdultsArray = (room) => {
    const adults = [];
    for (let i = 1; i <= room.capacity.adults; i++) {
      adults.push(i);
    }
    return adults;
  };

  const guestChildrenArray = (room) => {
    const children = [];
    for (let i = 1; i <= room.capacity.children; i++) {
      children.push(i);
    }
    return children;
  };

  const bookingObject = {
    checkInDate: bookingDates.checkInDate,
    checkOutDate: bookingDates.checkOutDate,
    numOfGuests: numOfGuests,
    rooms: selectedRooms,
    price: {
      total: overallTotal(selectedRooms),
      currency: rooms[0].price.currency,
    },
  };

  const updateNewBookingHandler = () => {
    dispatch(updateNewBooking(bookingObject));
  };

  // TODO: validate the number of guests against room capacity of selected rooms

  return (
    <Fragment>
      <div
        className="table-container w-full flex items-center justify-center
            p-2 sm:p-4"
      >
        <table className="border-collapse w-full md:w-[90%] xl:w-4/5 2xl:w-3/5">
          <caption>All available rooms</caption>
          <thead>
            <tr>
              <th
                className="px-2 py-4 border border-primary
               text-gray-light-1 bg-primary-dark"
              >
                Room Type
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Number of guests
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Price for {bookingNumberOfDays} days
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Your Choices
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Select Rooms
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              ></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => {
              return (
                <tr className="h-24" key={index}>
                  <td className="border  border-primary">
                    <div className="flex flex-col items-start">
                      <div className="p-2 flex flex-col items-start gap-y-2">
                        <span className="font-semibold text-lg text-gray-dark-2">
                          {room.roomName}
                        </span>
                        {room.beds.map((bed, index) => {
                          return (
                            <div className="" key={index}>
                              <LabelTag
                                key={index}
                                className="bg-primary py-[3px] px-2 text-sm"
                              >
                                <span>{bed.bedType}</span>
                              </LabelTag>
                            </div>
                          );
                        })}
                        <span>{room.amenities}</span>
                        <div className="flex items-center gap-x-2 p-2 rounded bg-gray-light-4">
                          <span
                            className="bg-primary text-gray-light-1 flex items-center
                             justify-center py-[2px] px-1 rounded text-sm font-semibold"
                          >
                            4.5
                          </span>
                          <StarRating numStars={4} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 border-primary-light">
                    <div className="flex items-start">
                      {guestAdultsArray(room).map((adult, index) => {
                        return (
                          <svg className="w-8 h-8 fill-gray-dark-3" key={index}>
                            <use href={`${sprite}#icon-person-small`}></use>
                          </svg>
                        );
                      })}
                      {guestChildrenArray(room).map((children, index) => {
                        return (
                          <div
                            className="flex items-center relative group"
                            key={index}
                          >
                            {index === 0 && (
                              <span className="text-lg px-1">+</span>
                            )}
                            <svg className="w-6 h-6 fill-gray-dark-3">
                              <use href={`${sprite}#icon-person-small`}></use>
                            </svg>
                            {index === guestChildrenArray(room).length - 1 && (
                              <div className="relative group ml-3">
                                <svg className="w-4 h-4 fill-gray-dark-3 cursor-pointer">
                                  <use href={`${sprite}#icon-info`}></use>
                                </svg>
                                <span
                                  className="absolute top-4 left-4 invisible opacity-0 w-
                                    w-28 p-1 bg-gray-800 text-white text-xs rounded-md 
                                    transform -translate-x-1/2 translate-y-2 transition-opacity duration-300 
                                    group-hover:opacity-100 group-hover:visible z-40"
                                >
                                  Free stay for your 2 year old child
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="border p-2 border-primary-light">
                    <div>
                      <span>
                        {room.price.currency + " "}
                        {addCommasToNumber(room.price.total)}
                      </span>
                    </div>
                  </td>
                  <td className="border px-2 border-primary-light">
                    <ul className="">
                      <li>
                        <span>- Break fast</span>
                      </li>
                      <li>
                        <span>- Lunch</span>
                      </li>
                      <li>
                        <span> - Dinner</span>
                      </li>
                      <li>
                        <span> - Free stay for your child</span>
                      </li>
                    </ul>
                  </td>
                  <td className="border px-2 border-primary-light">
                    {selectedRooms.map((selectedRoom, index) => {
                      if (selectedRoom.id === room.id) {
                        return (
                          <div key={index}>
                            <IconButton
                              icon="cross"
                              onClick={() => removeFromSelectedRooms(index)}
                              label="Unselect"
                              iconClass="w-3 h-3 fill-gray-light-2 font-bold"
                            />
                          </div>
                        );
                      }
                    })}
                    {!hasRoomBeenSelected(room) && (
                      <Button
                        className="font-bold"
                        onClick={() => onSelectRoomHandler(room)}
                      >
                        Select
                      </Button>
                    )}
                  </td>
                  {index === 0 && (
                    <td
                      className="border px-2 border-primary-light w-36 relative"
                      rowSpan={rooms.length}
                    >
                      <div
                        className="flex flex-col items-start h-full w-full gap-y-2
                                  absolute top-2 left-2"
                      >
                        <span className="px-2 py-1 bg-green-700 text-gray-light-1 rounded">
                          I'll reserve
                        </span>
                        <span>
                          {rooms[0].price.currency + " "}{" "}
                          {addCommasToNumber(overallTotal(selectedRooms))}
                        </span>
                        {!!overallTotal(selectedRooms) && isLoggedIn && (
                          <div onClick={() => updateNewBookingHandler()}>
                            <BookingLayout />
                          </div>
                        )}
                        {!!overallTotal(selectedRooms) && !isLoggedIn && (
                          <div className="bg-primary-dark text-gray-200 font-bold py-1 p-2 rounded">
                            <AuthLayout label="continue" />
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
