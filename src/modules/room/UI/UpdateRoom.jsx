import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Modal } from "../../../shared/UI/Modal";
import { Loader } from "../../../shared/UI/Loader";
import { Button } from "../../../shared/UI/Button";
import { updateRoom } from "../API";

export const UpdateRoom = (props) => {
  const id = props.id;
  //   const roomNumberRef = useRef(props.roomNumber);
  //   const roomTypeRef = useRef(props.roomType);
  //   const capacityRef = useRef(props.capacity);
  //   const priceRef = useRef(props.price);
  //   const priceCurrencyRef = useRef(props.priceCurrency);

  const [roomNumber, setRoomNumber] = useState(props.roomNumber);
  const [roomType, setRoomType] = useState(props.roomType);
  const [capacity, setCapacity] = useState(props.capacity);
  const [price, setPrice] = useState(props.price);
  const [priceCurrency, setPriceCurrency] = useState(props.priceCurrency);
  //   const imageUrl = props.imageUrl;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const roomNumberChangeHandler = (event) => setRoomNumber(event.target.value);
  const roomTypeChangeHandler = (event) => setRoomType(event.target.value);
  const capacityChangeHandler = (event) => setCapacity(event.target.value);
  const priceChangeHandler = (event) => setPrice(event.target.value);
  const priceCurrencyChangeHandler = (event) => {
    setPriceCurrency(event.target.value);
  };

  const { isLoading, data, mutate } = useMutation({
    mutationFn: updateRoom,
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

  const updateRoomHandler = (event) => {
    event.preventDefault();
    // const roomNumber = roomNumberRef.current.value;
    // const roomType = roomTypeRef.current.value;
    // const capacity = capacityRef.current.value;
    // const price = priceRef.current.value;
    // const priceCurrency = priceCurrencyRef.current.value;

    if (!roomNumber || !roomType || !capacity || !price || !priceCurrency) {
      return;
    }
    mutate({ id, roomNumber, roomType, capacity, price, priceCurrency, token });
  };

  return (
    <Fragment>
      <div className="flex justify-end">
        <Modal
          openModalElement={
            <Button className="inline-block mr-4" type="button">
              Update Room
            </Button>
          }
          className="top-8"
        >
          <div className="flex items-center justify-start">
            <form
              onSubmit={(event) => updateRoomHandler(event)}
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
                  onChange={(event) => roomNumberChangeHandler(event)}
                  value={roomNumber}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-1">
                <label htmlFor="roomType">Room type</label>
                <input
                  type="text"
                  placeholder="Room Type"
                  value={roomType}
                  onChange={(event) => roomTypeChangeHandler(event)}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-1">
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  placeholder="Room Capacity"
                  value={capacity}
                  onChange={(event) => capacityChangeHandler(event)}
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
                  value={priceCurrency}
                  onChange={(event) => priceChangeHandler(event)}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-6">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder="Room Price"
                  value={price}
                  onChange={(event) => priceChangeHandler}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[2px] border-gray-opacity focus:border-primary rounded transition-all"
                />
              </div>
              <div>
                {!isLoading && (
                  <Button type="submit" className="w-full bg-gray-light-1">
                    Update Room
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
