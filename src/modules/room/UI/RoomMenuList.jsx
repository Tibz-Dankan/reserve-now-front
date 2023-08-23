import React, { Fragment } from "react";
import { UpdateRoomLayout } from "../layouts/UpdateRoomLayout";

export const RoomMenuList = () => {
  return (
    <Fragment>
      <ul
        className="border-[1px] border-gray-light-3 text-sm absolute
        right-0 -top-16 bg-gray-light-1 p-2 shadow-2xl rounded-lg
        space-y-1"
      >
        <li>
          <UpdateRoomLayout />
        </li>
        <li>Delete room</li>
      </ul>
    </Fragment>
  );
};
