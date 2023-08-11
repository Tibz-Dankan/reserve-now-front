import React, { Fragment } from "react";
import { Modal } from "../../../shared/UI/Modal";
import { Button } from "../../../shared/UI/Button";
import { ProgressBar } from "../../../shared/UI/ProgressBar";
import { AddRoomForm } from "./AddRoomForm";

export const AddRoomOperations = () => {
  const stageLabelList = [
    {
      label: "Basic Information",
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
            <span className="font-bold text-gray-dark-3  text-lg p-4 sm:pl-8 self-start">
              Add new room
            </span>
          </div>
          <ProgressBar stageNum={4} stageLabelList={stageLabelList} />
          {/* TODO: render components below conditionally depending on the stage */}
          <AddRoomForm />
        </Modal>
      </div>
    </Fragment>
  );
};