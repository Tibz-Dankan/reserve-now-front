import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../shared/UI/Modal";
import { Button } from "../../../shared/UI/Button";
import { AppDate } from "../../../shared/utils/appDate";
import { UpdateRoomBasicInfo } from "../UI/UpdateRoomBasicInfo";
import { UpdateRoomBeds } from "../UI/UpdateRoomBeds";
import { UpdateRoomImages } from "../UI/UpdateRoomImages";
import { UpdateRoomPublicity } from "../UI/UpdateRoomPublicity";

export const UpdateRoomLayout = () => {
  const room = useSelector((state) => state.room.editRoom);

  const [label, setLabel] = useState("basic info");

  const isBasicInfo = label === "basic info";
  const isBeds = label === "beds";
  const isImages = label === "images";
  const isPublicity = label === "publicity";

  const editComponents = [
    {
      label: "basic info",
      component: <UpdateRoomBasicInfo />,
    },
    {
      label: "beds",
      component: <UpdateRoomBeds />,
    },
    {
      label: "images",
      component: <UpdateRoomImages />,
    },
    {
      label: "publicity",
      component: <UpdateRoomPublicity />,
    },
  ];

  const createdAt = new AppDate(room?.createdAt);

  const activeLabelStyles = `bg-gray-light-3 rounded-md relative before:absolute 
                             before:w-2 before:h-full before:top-0 before:-left-4 
                             before:bg-primary before:rounded`;

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
            <p className="text-gray-dark-3 text-xl p-4 sm:pl-8 self-start">
              <span> Edit room</span>
              {room?.roomName && (
                <span className="ml-1">({room?.roomName})</span>
              )}
            </p>
          </div>
          <div className="p-4 sm:pl-8 flex items-start">
            <img
              src={room?.images[0].url}
              alt={room?.roomName}
              className="w-24 h-20 bg-gray-light-3 rounded-lg"
            />
            <div className="flex flex-col justify-center px-4">
              <span className="text-lg font-semibold">{room?.roomName}</span>
              <div
                className="flex flex-col justify-center gap-y-[-8px]
                text-[12px]"
              >
                <span>Added on</span>
                <span>{createdAt.day()}</span>
                <span>{createdAt.time()}</span>
              </div>
            </div>
          </div>
          <div className="px-4 sm:pl-8 flex items-start">
            <ul className="space-y-4 mr-4 p-4">
              <li
                className={`${
                  isBasicInfo && activeLabelStyles
                } px-2 py-1 cursor-pointer hover:bg-gray-light-3 rounded`}
                onClick={() => setLabel("basic info")}
              >
                Basic Info
              </li>
              <li
                className={`${
                  isBeds && activeLabelStyles
                } px-2 py-1 cursor-pointer hover:bg-gray-light-3 rounded`}
                onClick={() => setLabel("beds")}
              >
                Beds
              </li>
              <li
                className={`${
                  isImages && activeLabelStyles
                } px-2 py-1 cursor-pointer hover:bg-gray-light-3 rounded`}
                onClick={() => setLabel("images")}
              >
                Images
              </li>
              <li
                className={`${
                  isPublicity && activeLabelStyles
                } px-2 py-1 cursor-pointer hover:bg-gray-light-3 rounded`}
                onClick={() => setLabel("publicity")}
              >
                Publicity
              </li>
            </ul>
            <div className="flex-1">
              {editComponents.map((editComponent) => {
                return (
                  <div key={editComponent.label}>
                    {editComponent.label === label && editComponent.component}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};
