import React, { Fragment, useState, useMemo } from "react";
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
import sprite from "../../../assets/icons/sprite.svg";

export const AddRoomBeds = () => {
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [bed, setBed] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.newRoom);
  const token = useSelector((state) => state.auth.token);

  const bedsWithLabel = useMemo(() => {
    const availableBeds = beds;
    if (availableBeds[0].bedType !== "Select bed type") {
      beds.unshift({
        bedType: "Select bed type",
        additionalInfo: "",
        capacity: "",
      });
    }
    return availableBeds;
  }, []);

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
      setShowError(true);
      throw new Error("Selected beds exceed the room capacity");
    }
  };

  const removeBed = (bedIndex) => {
    setSelectedBeds((prevSelectedBeds) => {
      return prevSelectedBeds.filter((bed, index) => index !== bedIndex);
    });
  };

  const addBedsHandler = (event) => {
    event.preventDefault();

    const roomId = room.id;
    const bedTypeArray = selectedBedTypes(selectedBeds);

    if (!roomId || !selectedBeds[0] || !token) {
      console.log("Missing bed room information");
      return;
    }
    validateRoomCapacity(selectedBeds);
    mutate({
      roomId,
      bedTypes: bedTypeArray,
      token,
    });
  };

  return (
    <Fragment>
      <div className="px-4 sm:px-8">
        <div className="text-center">
          {showError && (
            <div
              className="flex items-center justify-center bg-red-100 border-[1px]
                 border-red-300 rounded-lg p-2"
            >
              <span className="text-sm text-start text-red-600 p-2">
                {capacityError && capacityError}
              </span>
              <svg
                className="w-[15px] h-[15px] fill-red-600 cursor-pointer hover:fill-gray-400"
                onClick={() => setShowError(false)}
              >
                <use href={`${sprite}#icon-cancel-circle`}></use>
              </svg>
            </div>
          )}
        </div>
        <div
          className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4
           w-full h-[30vh] overflow-x-hidden pt-4"
        >
          {selectedBeds.map((bed, index) => {
            return (
              <div className="" key={index}>
                <LabelTag>
                  <div className="flex items-center justify-center gap-x-2">
                    <div className="relative group">
                      <svg
                        className="w-[15px] h-[15px] fill-white cursor-pointer 
                         group-hover:fill-gray-400"
                      >
                        <use href={`${sprite}#icon-info`}></use>
                      </svg>
                      <span
                        className="absolute top-5 left-[88px] invisible opacity-0 w-
                        w-[200px] p-1 bg-gray-800 text-white text-xs rounded-md 
                        transform -translate-x-1/2 translate-y-2 transition-opacity duration-300 
                        group-hover:opacity-100 group-hover:visible z-40"
                      >
                        {bed.additionalInfo}
                      </span>
                    </div>
                    <span>{bed.bedType}</span>
                    <svg
                      className="w-[15px] h-[15px] fill-white cursor-pointer hover:fill-gray-400"
                      onClick={() => removeBed(index)}
                    >
                      <use href={`${sprite}#icon-cancel-circle`}></use>
                    </svg>
                  </div>
                </LabelTag>
              </div>
            );
          })}
          <form
            onSubmit={(event) => addBedsHandler(event)}
            className="h-[18vh]"
          >
            <div className="inline-block w-full text-start">
              <select
                value={bed}
                onChange={(event) => onSelectBedHandler(event)}
                className="border-[1px] border-gray-400 focus:border-primary
              focus:bg-gray-200 transition-all outline-none p-2 rounded-3xl
               bg-gray-light-1 text-sm"
              >
                {bedsWithLabel.map((bed, index) => {
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
                <Button
                  type="submit"
                  className="bg-gray-light-1 rounded-md font-bold"
                >
                  Add Beds
                </Button>
              )}
              {isLoading && <Loader label="adding" className="w-36" />}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
