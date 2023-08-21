import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";

import { getRoom } from "../API";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { updateAddRoomStage, clearRoom } from "../../../store/actions/room";
import { publishRoom } from "../API";
import sprite from "../../../assets/icons/sprite.svg";

export const AddRoomPublicity = () => {
  const room = useSelector((state) => state.room.newRoom);
  console.log("room");
  console.log(room);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getRoomById = async () => {
    console.log("room.id");
    console.log(room.id);
    return await getRoom(room.id);
  };

  const { data } = useQuery({
    queryKey: ["newRoom"],
    queryFn: getRoomById,
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  // console.log("data");
  // console.log(data);

  const updatedNewRoom = data?.data.room;
  const roomImages = updatedNewRoom?.images;
  const beds = updatedNewRoom?.beds;

  const nextImage = () => {
    if (currentImageIndex < roomImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const capitalizeFirstLetter = (word) => {
    if (!word) return;
    if (typeof word !== "string" || word?.length === 0) {
      throw new Error("Input must be a non-empty string");
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: publishRoom,
    onSuccess: (data) => {
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const publishRoomHandler = () => {
    const roomId = room.id;
    if (!roomId) {
      return;
    }
    mutate({ roomId, token });
  };

  const AnotherRoomHandler = () => {
    dispatch(clearRoom());
  };

  return (
    <Fragment>
      <div>
        {updatedNewRoom !== undefined && (
          <div className="px-4 sm:px-8 sm:flex sm:items-start justify-center">
            <div className="relative bg-blue-5s00 px-12 pb-4">
              <img
                src={"roomImages[0]?.url"}
                alt={updatedNewRoom?.roomName}
                className="bg-gray-light-3 w-[250px] h-[220px] rounded-lg"
              />
              <div
                className="w-10 h-10 flex items-center justify-center bg-gray-light-2
               rounded-[50%] border-[1px] border-gray-light-3 absolute left-1 top-1/3
              hover:bg-gray-light-3 transition-transform cursor-pointer"
                onClick={() => prevImage()}
              >
                <svg className="w-[24px] h-[24px] fill-gray-dark-3 rotate-[90deg]">
                  <use href={`${sprite}#icon-arrow-down`}></use>
                </svg>
              </div>
              <div
                className="w-10 h-10 flex items-center justify-center bg-gray-light-2
               rounded-[50%] border-[1px] border-gray-light-3 absolute right-1 top-1/3
               hover:bg-gray-light-3 transition-transform cursor-pointer"
                onClick={() => nextImage()}
              >
                <svg className="w-[24px] h-[24px] fill-gray-dark-3 rotate-[-90deg]">
                  <use href={`${sprite}#icon-arrow-down`}></use>
                </svg>
              </div>
              <div>
                <span className="text-sm font-light">
                  {capitalizeFirstLetter(
                    roomImages[currentImageIndex]?.viewType
                  )}{" "}
                  view
                </span>
              </div>
            </div>
            <div className="px-4 sm:px-8">
              <label className="text-lg">Basic Info</label>
              <ul className="text-base font-light mb-4">
                <li>
                  <span className="first-letter:uppercase">
                    {capitalizeFirstLetter(updatedNewRoom?.roomName)}
                  </span>
                </li>
                <li>
                  <span>{capitalizeFirstLetter(updatedNewRoom?.roomType)}</span>
                </li>
                <li>
                  <span className="mr-4">
                    {updatedNewRoom?.capacity?.adults} adults
                  </span>
                  <span>{updatedNewRoom?.capacity?.children} children</span>
                </li>
                <li>
                  <span>{updatedNewRoom?.price?.amount} </span>
                  <span>{updatedNewRoom?.price?.currency}</span>
                  <span className="ml-2">per night</span>
                </li>
                <li className="mt-1">
                  {updatedNewRoom?.publish?.isPublished && (
                    <span className="bg-green-200 px-2 py-1 rounded">
                      Published
                    </span>
                  )}
                  {!updatedNewRoom?.publish?.isPublished && (
                    <span className="bg-red-200 px-2 py-1 rounded">
                      Not published
                    </span>
                  )}
                </li>
              </ul>
              <label className="text-lg mt-4">Beds</label>
              <ul className="text-base font-light">
                <li className="space-x-1">
                  {beds[0] &&
                    beds.map((bed, index) => {
                      return (
                        <span
                          className="bg-primary px-2 py-1 text-gray-light-1 rounded-2xl"
                          key={index}
                        >
                          {bed.bedType}
                        </span>
                      );
                    })}
                  {!beds[0] && <span>No beds</span>}
                </li>
              </ul>
            </div>
          </div>
        )}
        <div
          className="flex justify-between w-full border-t-[1px] border-gray-opacity 
          p-4 sm:px-8 bottom-0 right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg 
          rounded-br-lg"
        >
          {!isLoading && (
            <Button
              className="font-bold disabled:first-line:bg-primary-light
             disabled:text-gray-light-2"
              onClick={() => publishRoomHandler()}
              disabled={isLoading}
            >
              Publish
            </Button>
          )}
          {isLoading && <Loader label="Publishing" className="w-40" />}
          <Button
            className="font-bold disabled:first-line:bg-primary-light
            disabled:text-gray-light-2"
            onClick={() => AnotherRoomHandler()}
            disabled={isLoading}
          >
            Another Room
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
