import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MasterLayout } from "../../../shared/layouts/MasterLayout";
import { AddRoomLayout } from "../layouts/AddRoomLayout";
import { updateAddRoomStage, updateNewRoom } from "../../../store/actions/room";
import { RoomList } from "../UI/RoomList";

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

  return (
    <Fragment>
      <MasterLayout title="Rooms">
        <div className="w-full p-4">
          <AddRoomLayout />
          <RoomList />
        </div>
      </MasterLayout>
    </Fragment>
  );
};
