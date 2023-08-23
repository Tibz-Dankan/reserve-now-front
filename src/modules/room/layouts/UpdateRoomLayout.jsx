import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../shared/UI/Modal";
import { Button } from "../../../shared/UI/Button";
import { AppDate } from "../../../shared/utils/appDate";

export const UpdateRoomLayout = () => {
  const room = useSelector((state) => state.room.editRoom);

  const [label, setLabel] = useState("basic info");

  const labelHandler = (label) => {
    setLabel(label);
  };

  const edits = [
    {
      label: "basic info",
      component: <span>Basic info</span>,
    },
    {
      label: "beds",
      component: <span>Beds</span>,
    },
    {
      label: "images",
      component: <span>Images</span>,
    },
    {
      label: "publicity",
      component: <span>Publicity</span>,
    },
  ];

  const createdAt = new AppDate(room.createdAt);

  return (
    <Fragment>
      <div>
        <Modal
          openModalElement={<span className="cursor-pointer">Edit room</span>}
          className="top-8"
        >
          <div
            className="flex items-center justify-start border-b-[1px]
           border-gray-opacity"
          >
            <p className="text-gray-dark-3  text-xl p-4 sm:pl-8 self-start">
              <span> Edit room</span>
              {room?.roomName && (
                <span className="ml-1">({room?.roomName})</span>
              )}
            </p>
          </div>
          <div className="p-4 sm:pl-8 flex items-start">
            <img
              src={room.images[0].url}
              alt={room.roomName}
              className="w-24 h-20 bg-gray-light-3 rounded-lg"
            />
            <div className="flex flex-col justify-center px-2">
              <span className="text-lg font-semibold">{room.roomName}</span>
              <div
                className="flex flex-col justify-center gap-y-[-8px]
                    text-sm"
              >
                <span>{createdAt.day()}</span>
                <span>{createdAt.time()}</span>
              </div>
            </div>
          </div>
          <div className="p-4 sm:pl-8 flex items-center justify-start">
            <ul className="space-y-4">
              <li>Basic Info</li>
              <li>Beds</li>
              <li>Images</li>
              <li>Publicity</li>
            </ul>
            <div>The current component</div>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};
