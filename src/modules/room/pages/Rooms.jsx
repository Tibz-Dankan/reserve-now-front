import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "../API";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { MasterLayout } from "../../../shared/layouts/MasterLayout";
import { AddRoomLayout } from "../UI/AddRoomLayout";
import { UpdateRoom } from "../UI/UpdateRoom";
import { updateAddRoomStage, updateNewRoom } from "../../../store/actions/room";

export const Rooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryUpdateRoom = async () => {
      const strNewRoomData = localStorage.getItem("newRoom");
      const strAddRoomStageData = localStorage.getItem("addRoomStage");
      const parsedNewRoomData = JSON.parse(strNewRoomData);
      const parsedAddRoomStageData = JSON.parse(strAddRoomStageData);

      if (!parsedNewRoomData || !parsedAddRoomStageData) {
        localStorage.removeItem("newRoom");
        localStorage.removeItem("addRoomStage");
        return;
      }
      dispatch(updateAddRoomStage(parsedAddRoomStageData));
      dispatch(updateNewRoom(parsedNewRoomData));
    };
    tryUpdateRoom();
  }, [dispatch]);

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
          <AddRoomLayout />
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
