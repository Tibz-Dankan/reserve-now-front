import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { MasterLayout } from "../../../shared/layouts/MasterLayout";
import { AddRoom } from "../UI/AddRoom";
import { UpdateRoom } from "../UI/UpdateRoom";

export const Rooms = () => {
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
      <MasterLayout title="Rooms">
        <div className="w-full p-4">
          <AddRoom />
          {rooms.map((room) => {
            return (
              <div key={room.id}>
                <span> Room {room.roomNumber} </span>
                <UpdateRoom
                  id={room.id}
                  roomNumber={room.roomNumber}
                  roomType={room.roomType}
                  capacity={room.capacity}
                  price={room.price}
                  priceCurrency={room.priceCurrency}
                />
              </div>
            );
          })}
        </div>
      </MasterLayout>
    </Fragment>
  );
};
