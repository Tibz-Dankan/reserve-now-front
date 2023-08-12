import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Loader } from "../../../shared/UI/Loader";
import { Button } from "../../../shared/UI/Button";
import { addRoomBeds } from "../API";
import { updateAddRoomStage } from "../../../store/actions/room";
import beds from "../data/beds.json";
import { LabelTag } from "../../../shared/UI/LabelTag";

export const AddRoomBedForm = () => {
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [bed, setBed] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.newRoom);

  console.log("beds");
  console.log(beds);

  const onSelectBedHandler = (event) => {
    setBed("");
    setSelectedBeds((beds) => [...beds, JSON.parse(event.target.value)]);
  };

  const { isLoading, data, mutate } = useMutation({
    mutationFn: addRoomBeds,
    onSuccess: (data) => {
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      dispatch(updateAddRoomStage(3));
      setSelectedBeds([]);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const selectedBedTypes = (selectedBedsArray) => {
    return selectedBedsArray.map((bed) => bed.bedType);
  };

  const validateRoomCapacity = (selectedBeds) => {
    const selectedTotalCapacity = selectedBeds.reduce(
      (total, bed) => total + bed.capacity,
      0
    );
    const roomCapacity = room.capacity.adults;
    if (selectedTotalCapacity > roomCapacity) {
      setCapacityError("Selected beds exceed the room capacity");
      throw new Error("Selected beds exceed the room capacity");
    }
  };

  const addBedsHandler = (event) => {
    event.preventDefault();

    const roomId = room.id;
    const bedTypeArray = selectedBedTypes(selectedBeds);

    if (!roomId || !selectedBeds[0]) {
      return;
    }
    validateRoomCapacity(selectedBeds);
    mutate({
      roomId,
      bedTypes: bedTypeArray,
    });
  };

  return (
    <Fragment>
      <div>
        <div
          className="flex items-start justify-center w-full h-[50%vh] overflow-x-hidden
          px-4 sm:px-8"
        >
          {selectedBeds.map((bed) => {
            return (
              <div className="m-1">
                <LabelTag>{bed.bedType}</LabelTag>
              </div>
            );
          })}
          <div>
            <span className="text-sm text-red-600">
              {capacityError && capacityError}
            </span>
          </div>
        </div>
        <form onSubmit={(event) => addBedsHandler(event)}>
          <div>
            <select
              value={bed}
              onChange={(event) => onSelectBedHandler(event)}
              className="border-[1px] border-gray-400 focus:border-primary
              focus:bg-gray-200 transition-all outline-none p-2 pl-8 rounded
               bg-gray-light-1 text-sm"
            >
              {beds.map((bed, index) => {
                return (
                  <option key={index} value={JSON.stringify(bed)}>
                    {bed.bedType}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className="border-t-[1px] border-gray-opacity p-4 sm:px-8 absolute 
             bottom-0 right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg rounded-br-lg"
          >
            {!isLoading && (
              <Button type="submit" className="bg-gray-light-1 rounded-md">
                Add
              </Button>
            )}
            {isLoading && <Loader />}
          </div>
        </form>
      </div>
    </Fragment>
  );
};
