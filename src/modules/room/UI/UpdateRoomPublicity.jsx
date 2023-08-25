import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { publishRoom, unPublishRoom } from "../API";
import sprite from "../../../assets/icons/sprite.svg";

export const UpdateRoomPublicity = () => {
  const saveRoom = useSelector((state) => state.room.editRoom);
  const token = useSelector((state) => state.auth.token);
  const [room, setRoom] = useState(saveRoom);
  const [isPublished, setIsPublished] = useState(room?.publish?.isPublished);
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: isPublished ? unPublishRoom : publishRoom,
    onSuccess: (data) => {
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      setRoom(data.data.room);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  useEffect(() => {
    setIsPublished(room?.publish?.isPublished);
  }, [isLoading]);

  const publishRoomHandler = () => {
    const roomId = saveRoom.id;
    if (!roomId) {
      return;
    }
    mutate({ roomId, token });
  };

  return (
    <Fragment>
      <div>
        <div className="border-b-[1px] border-gray-opacity mb-1 pb-2">
          <h1 className="text-xl font-semibold text-gray-dark-4">Publicity</h1>
        </div>
        <div
          className="flex flex-col items-start justify-start w-full h-[30vh] 
              py-2 pt-1 sm:pt-2"
        >
          {isPublished && (
            <span className="bg-green-200 px-2 py-1 rounded text-sm sm:text-lg font-light">
              Published
            </span>
          )}
          {!isPublished && (
            <span className="bg-yellow-200 px-2 py-1 rounded text-sm sm:text-lg font-light">
              Not published
            </span>
          )}
          {isPublished && (
            <div
              className=" flex items-center gap-x-2 border-[1px] border-opacity-5
              border-gray-opacity p-2 lg:p-4 mt-2 sm:mt-4 rounded-lg"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <svg className="w-4 h-4 fill-gray-dark-2">
                  <use href={`${sprite}#icon-check-circle`}></use>
                </svg>
              </span>
              <span className="font-light text-start text-sm sm:text-base">
                Please note that a published room is visible to clients for
                booking
              </span>
            </div>
          )}
          {!isPublished && (
            <div
              className=" flex items-center gap-x-2 border-[1px] border-opacity-5
               border-gray-opacity p-2 lg:p-4 mt-2 sm:mt-4 rounded-lg"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <svg className="w-4 h-4 fill-gray-dark-2">
                  <use href={`${sprite}#icon-warning`}></use>
                </svg>
              </span>
              <span className="font-light text-start text-sm sm:text-base">
                Please note that unpublished room is not visible to clients to
                booking
              </span>
            </div>
          )}
        </div>
        <div
          className="flex justify-between w-full border-t-[1px] border-gray-opacity 
          p-4 pl-0 bottom-0 right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg 
          rounded-br-lg"
        >
          {!isLoading && !isPublished && (
            <Button
              className="font-bold disabled:first-line:bg-primary-light
             disabled:text-gray-light-2"
              onClick={() => publishRoomHandler()}
              disabled={isLoading}
            >
              Publish
            </Button>
          )}
          {!isLoading && isPublished && (
            <Button
              className="font-bold disabled:first-line:bg-primary-light
             disabled:text-gray-light-2"
              onClick={() => publishRoomHandler()}
              disabled={isLoading}
            >
              UnPublish
            </Button>
          )}
          {isLoading && <Loader label="Publishing" className="w-40" />}
        </div>
      </div>
    </Fragment>
  );
};
