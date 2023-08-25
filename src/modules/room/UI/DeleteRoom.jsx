import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { deleteRoom } from "../API";
import sprite from "../../../assets/icons/sprite.svg";

export const DeleteRoom = () => {
  const token = useSelector((state) => state.auth.token);
  const room = useSelector((state) => state.room.deleteRoom);
  const [roomName, setRoomName] = useState("");
  const [isRoomName, setIsRoomName] = useState(false);

  const validateInput = (userInput) => {
    const expectedInput = `delete room ${room.roomName}`;
    const isSameInput = expectedInput === userInput;
    setIsRoomName(isSameInput);
  };

  const roomNameChangeHandler = (event) => {
    setRoomName(event.target.value);
    validateInput(event.target.value);
  };

  const dispatch = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: deleteRoom,
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

  const deleteRoomHandler = async (event) => {
    event.preventDefault();

    if (!isRoomName) {
      console.log("Typed input not equal to expected input");
      return;
    }
    const roomId = room.id;
    if (!roomId) {
      console.log("No roomId provided");
      return;
    }
    mutate({ roomId, token });
  };

  return (
    <Fragment>
      <form
        onSubmit={(event) => deleteRoomHandler(event)}
        className="flex flex-col items-center justify-center text-gray-dark-3"
      >
        <div className="w-full p-4 sm:p-8 flex flex-col items-start gap-y-4">
          <p className="sm:w-4/5 lg:w-3/5">
            All beds and images associated with{" "}
            <span className="mx-1 font-semibold">{room.roomName}</span>
            will be deleted immediately. This action cannot be undone.
          </p>
          <p>Are you sure you want to delete this room?</p>
          <label htmlFor="roomName" className="">
            Type
            <span className="text-pink-600 ml-1 font-semibold">
              delete room {" " + room.roomName + " "}
            </span>
            below to confirm.
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(event) => roomNameChangeHandler(event)}
            required
            className="w-full bg-gray-light-1 p-2 outline-none border-[1px]
             border-gray-opacity focus:border-[2px] focus:border-pink-600 rounded-md"
          />
        </div>
        <div
          className="border-t-[1px] border-gray-opacity absolutes bottom-0 
            right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg rounded-br-lg w-full
            p-4 sm:px-8"
        >
          {!isLoading && (
            <Button
              type="submit"
              className="bg-pink-600 rounded-md font-bold disabled:bg-pink-300"
              disabled={!isRoomName}
            >
              Delete Room
            </Button>
          )}
          {isLoading && (
            <Loader label="Deleting" className="w-36 bg-pink-600" />
          )}
        </div>
      </form>
    </Fragment>
  );
};
