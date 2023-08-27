import React, { Fragment, useState } from "react";
import roomImage from "../../../assets/Images/room1.png";
import { LabelTag } from "../../../shared/UI/LabelTag";
import { StarRating } from "../../review/UI/StarRating";
import sprite from "../../../assets/icons/sprite.svg";

export const RoomsTable = (props) => {
  const [rooms, setRooms] = useState(props.rooms);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const roomsArrayLength = rooms?.length;

  const beds = [
    {
      bedType: "king bed",
    },
  ];

  const removeFromSelectedRooms = (roomIndex) => {
    setSelectedBeds((selectedRooms) => {
      return selectedRooms.filter((bed, index) => index !== roomIndex);
    });
  };

  const onSelectRoomHandler = (event) => {
    setSelectedRooms((rooms) => [...rooms, JSON.parse(event.target.value)]);
  };

  const overallTotal = (selectRooms) => {
    const selectedTotalPrice = selectRooms.reduce(
      (overallTotal, room) => overallTotal + room.total,
      0
    );
    return selectedTotalPrice;
  };

  const generateGuestAdultsArray = () => {
    const adults = [];
    // for (let i = 1; i <= props?.capacity.adults; i++) {
    for (let i = 1; i <= 2; i++) {
      adults.push(i);
    }
    return adults;
  };

  const generateGuestChildrenArray = () => {
    const children = [];
    // for (let i = 1; i <= props?.capacity.children; i++) {
    for (let i = 1; i <= 1; i++) {
      children.push(i);
    }
    return children;
  };

  const guestAdults = generateGuestAdultsArray();
  const guestChildren = generateGuestChildrenArray();
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
                className="px-2 py-4 border border-primary-light
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
                Price for {" 4 days"}
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
              >
                {"     empty   "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-24 ">
              <td className="border  border-primary-light">
                <div className="flex flex-col items-start">
                  {/* <img
                    src={roomImage}
                    alt="room image"
                    className="w-full min-h-[84px] h-auto bg-gray-light-3"
                  /> */}
                  <div className="p-2 flex flex-col items-start gap-y-2">
                    <span className="font-semibold text-lg text-gray-dark-2">
                      Cottage 1
                    </span>
                    {beds.map((bed, index) => {
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
                    <span>Free wifi, slippers, TV</span>
                    <div
                      className="flex items-center gap-x-2 shadow-md p-2 rounded
                     bg-gray-light-4"
                    >
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
                  {guestAdults.map((adult, index) => {
                    return (
                      <svg className="w-8 h-8 fill-gray-dark-3" key={index}>
                        <use href={`${sprite}#icon-person-small`}></use>
                      </svg>
                    );
                  })}
                  {guestChildren.map((children, index) => {
                    return (
                      <div
                        className="flex items-center relative group"
                        key={index}
                      >
                        {index === 0 && <span className="text-lg px-1">+</span>}
                        <svg className="w-6 h-6 fill-gray-dark-3">
                          <use href={`${sprite}#icon-person-small`}></use>
                        </svg>
                        {index === guestChildren.length - 1 && (
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
                  {/* Price for 4 days */}
                  <span>
                    {/* {price.currency} */}
                    {" UGX "}
                    {" 150,000 "}
                    {/* {price.amount} */}
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
                <select
                  value={"room object"}
                  onChange={(event) => onSelectRoomHandler(event)}
                  className="border-[1px] border-gray-400 focus:border-primary
                  first-letter:focus:bg-gray-200 transition-all outline-none p-2 rounded-lg
                bg-gray-light-1 text-sm"
                >
                  <option value={JSON.stringify("room")}>
                    {"---select room---"}
                  </option>
                  <option value={JSON.stringify("room")}>
                    {"Room total price"}
                  </option>
                </select>
              </td>
              <td className="border px-2 border-primary-light">
                <div className="flex flex-col items-center">
                  <span
                    className="px-2 py-1 bg-green-700 text-gray-light-1 rounded
                         w-full"
                  >
                    I'll reserve
                  </span>
                  {/* <span>{room?.price.currency+ " "} {overallTotal(selectedRooms)}</span> */}
                  <span>
                    {"UGX" + " "} {"245,000"}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
