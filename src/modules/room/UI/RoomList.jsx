import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { UpdateRoom } from "./UpdateRoom";
import { RoomCard } from "./RoomCard";

export const RoomList = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const rooms = data.data;
  return (
    <Fragment>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        xl:grid-cols-4 gap-4"
      >
        {rooms.map((room, index) => {
          return (
            // <div key={room.id}>
            //   <span> Room {room.roomNumber} </span>
            //   <UpdateRoom
            //     id={room.id}
            //     roomNumber={room.roomNumber}
            //     roomType={room.roomType}
            //     capacity={room.capacity}
            //     price={room.price}
            //     priceCurrency={room.priceCurrency}
            //   />
            // </div>
            <div key={index}>
              <RoomCard
                roomName={room.roomName}
                images={room.images}
                beds={room.beds}
                price={room.price}
                room={room}
              />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
