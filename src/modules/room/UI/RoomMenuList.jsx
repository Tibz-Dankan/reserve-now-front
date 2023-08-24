import React, { Fragment } from "react";
import { UpdateRoomLayout } from "../layouts/UpdateRoomLayout";
import { useDispatch } from "react-redux";
import { updateEditRoom } from "../../../store/actions/room";

export const RoomMenuList = (props) => {
  const dispatch = useDispatch();

  const dispatchEditRoom = (editRoom) => {
    dispatch(updateEditRoom(editRoom));
  };
  return (
    <Fragment>
      <ul
        className="border-[1px] border-gray-light-3 text-sm absolute
        right-0 -top-16 bg-gray-light-1 p-2 shadow-2xl rounded-lg
        space-y-1"
      >
        <li onClick={() => dispatchEditRoom(props.room)}>
          <UpdateRoomLayout />
        </li>
        <li>Delete room</li>
      </ul>
    </Fragment>
  );
};
