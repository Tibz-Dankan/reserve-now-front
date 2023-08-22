import React, { Fragment, useEffect } from "react";
import { Modal } from "../../../shared/UI/Modal";
import { Button } from "../../../shared/UI/Button";
import { ProgressBar } from "../../../shared/UI/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { AddRoomForm } from "../UI/AddRoomForm";
import { AddRoomBedForm } from "../UI/AddRoomBedForm";
import { AddRoomImages } from "../UI/AddRoomImages";
import { AddRoomPublicity } from "../UI/AddRoomPublicity";

export const AddRoomLayout = () => {
  const addRoomStage = useSelector((state) => state.room.addRoomStage);
  const room = useSelector((state) => state.room.newRoom);

  const stageLabelList = [
    {
      label: "Basic Info",
      stage: 1,
    },
    {
      label: "Add Beds",
      stage: 2,
    },
    {
      label: "Upload Images",
      stage: 3,
    },
    {
      label: "Publish",
      stage: 4,
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-end">
        <Modal
          openModalElement={
            <Button className="inline-block mr-4" type="button">
              New Room
            </Button>
          }
          className="top-8"
        >
          <div
            className="flex items-center justify-start border-b-[1px]
           border-gray-opacity"
          >
            <p className="text-gray-dark-3  text-xl p-4 sm:pl-8 self-start">
              <span> Add new room</span>
              {room?.roomName && (
                <span className="ml-1">({room?.roomName})</span>
              )}
            </p>
          </div>
          <ProgressBar
            stageNum={4}
            stageLabelList={stageLabelList}
            currentStage={addRoomStage}
          />
          {addRoomStage === 1 && <AddRoomForm />}
          {addRoomStage === 2 && <AddRoomBedForm />}
          {addRoomStage === 3 && <AddRoomImages />}
          {addRoomStage === 4 && <AddRoomPublicity />}
        </Modal>
      </div>
    </Fragment>
  );
};
