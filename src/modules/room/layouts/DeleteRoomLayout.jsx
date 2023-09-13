import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../shared/UI/Modal";
import { DeleteRoom } from "../UI/DeleteRoom";

export const DeleteRoomLayout = () => {
  const room = useSelector((state) => state.room.deleteRoom);

  return (
    <Fragment>
      <Modal
        openModalElement={<span className="cursor-pointer">Delete room</span>}
        onModalClose={() => {}}
        className="top-8"
      >
        <div
          className="flex items-center justify-start border-b-[1px]
           border-gray-opacity"
        >
          <p className="text-gray-dark-3 text-xl p-4 sm:pl-8 self-start">
            <span> Delete room</span>
            {room?.roomName && <span className="ml-1">({room?.roomName})</span>}
          </p>
        </div>
        <DeleteRoom />
      </Modal>
    </Fragment>
  );
};
