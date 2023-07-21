import React, { Fragment } from "react";
import roomImage from "../../../assets/Images/room1.png";

export const UniqueRoomTypes = () => {
  // TODO: To fetch rooms from the api
  const uniqueRooms = [
    {
      roomType: "Standard",
      image: roomImage,
    },
    {
      roomType: "Deluxe",
      image: roomImage,
    },
    {
      roomType: "Suite",
      image: roomImage,
    },
    {
      roomType: "Executive",
      image: roomImage,
    },
    {
      roomType: "Family",
      image: roomImage,
    },
    {
      roomType: "Penthouse",
      image: roomImage,
    },
  ];

  return (
    <Fragment>
      <div className="bg-green-4 p-4 mt-16">
        <p className="text-center text-lg mb-4">Rooms</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {uniqueRooms.map((room, index) => (
            <div key={index + 1}>
              <img
                src={room.image}
                alt={room.roomType}
                className="w-[100%] h-[90%] bg-gray-500 rounded-xl"
              />
              <span>{room.roomType}</span>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
