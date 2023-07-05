import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Modal } from "../../../shared/UI/Modal";
import { Loader } from "../../../shared/UI/Loader";
import { Button } from "../../../shared/UI/Button";
import { addRoom } from "../API";

export const AddRoom = () => {
  const roomNumberRef = useRef(null);
  const roomTypeRef = useRef(null);
  const capacityRef = useRef(null);
  const priceRef = useRef(null);
  const priceCurrencyRef = useRef(null);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: addRoom,
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

  const addRoomHandler = (event) => {
    event.preventDefault();
    const roomNumber = roomNumberRef.current.value;
    const roomType = roomTypeRef.current.value;
    const capacity = capacityRef.current.value;
    const price = priceRef.current.value;
    const priceCurrency = priceCurrencyRef.current.value;

    if (!roomNumber || !roomType || !capacity || !price || !priceCurrency) {
      return;
    }
    mutate({ roomNumber, roomType, capacity, price, priceCurrency, token });
  };

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
          <div className="flex items-center justify-start">
            <form
              onSubmit={(event) => addRoomHandler(event)}
              className="border-[2px] border-gray-opacity rounded m-4 p-4 w-[35%]"
            >
              <div className="flex items-center justify-center pb-1">
                <span className="mr-2">Logo</span>
                <span>Add Room</span>
              </div>
              <div className="flex flex-col items-start justify-center mb-1">
                <label htmlFor="roomNumber">Room number</label>
                <input
                  type="number"
                  placeholder="Room number"
                  ref={roomNumberRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-1">
                <label htmlFor="roomType">Room type</label>
                <input
                  type="text"
                  placeholder="Room Type"
                  ref={roomTypeRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-1">
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  placeholder="Room Capacity"
                  ref={capacityRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              {/* TODO: To add priceCurrency select with price field */}
              <div className="flex flex-col items-start justify-center mb-1">
                <label htmlFor="priceCurrency">Price currency</label>
                <input
                  type="text"
                  placeholder="Price currency"
                  ref={priceCurrencyRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-6">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder="Room Price"
                  ref={priceRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div>
                {!isLoading && (
                  <Button type="submit" className="w-full bg-gray-light-1">
                    Add Room
                  </Button>
                )}
                {isLoading && <Loader />}
              </div>
            </form>
            <div className="flex-1 bg-red-400">some image icons</div>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};
