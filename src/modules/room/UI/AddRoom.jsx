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
import { ProgressBar } from "../../../shared/UI/ProgressBar";
import { addRoom } from "../API";

export const AddRoom = () => {
  const roomNameRef = useRef(null);
  const roomTypeRef = useRef(null);
  const capacityOfAdultsRef = useRef(null);
  const capacityOfChildrenRef = useRef(null);
  const priceAmountRef = useRef(null);
  const priceCurrencyRef = useRef(null);
  const amenitiesRef = useRef(null);
  const roomViewRef = useRef(null);
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
    const roomName = roomNameRef.current.value;
    const roomType = roomTypeRef.current.value;
    const capacityOfAdults = capacityOfAdultsRef.current.value;
    const capacityOfChildren = capacityOfChildrenRef.current.value;
    const priceAmount = priceAmountRef.current.value;
    const priceCurrency = priceCurrencyRef.current.value;
    const amenities = amenitiesRef.current.value;
    const view = roomViewRef.current.value;

    const capacity = { adults: capacityOfAdults, children: capacityOfChildren };
    const price = { amount: priceAmount, currency: priceCurrency };

    if (
      !roomName ||
      !roomType ||
      !capacity.adults ||
      !price.amount ||
      !price.currency
    ) {
      return;
    }
    mutate({
      roomName,
      roomType,
      capacity,
      price,
      amenities,
      view,
      token,
    });
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
          <form
            onSubmit={(event) => addRoomHandler(event)}
            className="border-[0px] border-gray-opacity rounded w-[100%] h-[80vh] 
            relative"
          >
            <div
              className="flex items-center justify-start border-b-[1px]
                  border-gray-opacity"
            >
              <span className="font-bold text-gray-dark-3  text-lg p-4 self-start">
                Add new room
              </span>
            </div>
            <div>
              <ProgressBar
                stageNum={4}
                stageLabelList={[
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
                ]}
              />
            </div>
            <div
              className="overflow-x-hidden h-[80%] sm:h-auto pb-9 sm:pb-4 grid 
                 sm:grid-cols-2"
            >
              <div
                className="flex flex-col items-start justify-center mx-4 my-2
                   space-y-1"
              >
                <label htmlFor="roomNumber">Room Name</label>
                <input
                  type="text"
                  placeholder="Room number"
                  ref={roomNameRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[1px]
                  border-gray-opacity focus:border-[2px] focus:border-primary 
                    rounded-md"
                />
              </div>
              <div className="flex flex-col items-start justify-center mx-4 my-2 space-y-1">
                <label htmlFor="roomType">Room Type</label>
                {/* TODO: TO be selected from the input field */}
                <input
                  type="text"
                  placeholder="Room Type"
                  ref={roomTypeRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[1px]
                  border-gray-opacity focus:border-[2px] focus:border-primary 
                    rounded-md"
                />
              </div>
              <div className="flex flex-col items-start justify-center mx-4 my-2 space-y-1">
                <label htmlFor="capacity">Capacity</label>
                <div
                  className="flex items-center justify-start w-full border-[1px]
                      border-gray-opacity px-2 rounded-md focus:border-[2px]
                      focus:border-primary "
                >
                  <input
                    type="number"
                    placeholder="2"
                    ref={capacityOfAdultsRef}
                    required
                    className="w-14 bg-gray-light-1 p-1 outline-none border-none
                     focus:border-primary rounded transition-all text-center"
                  />
                  <span className="mr-2 text-gray-dark-2">Adults</span>
                  <input
                    type="number"
                    placeholder="0"
                    ref={capacityOfChildrenRef}
                    required
                    className="w-14 bg-gray-light-1 p-1 outline-none border-none
                    focus:border-primary rounded transition-all text-center"
                  />
                  <span className="mx-2 text-gray-dark-2">children</span>
                </div>
              </div>
              {/* TODO: To add priceCurrency select with price field */}

              <div className="flex flex-col items-start justify-center mx-4 my-2 space-y-1">
                <label htmlFor="capacity">Price per night</label>
                <div
                  className="flex items-center justify-start w-full border-[1px]
                      border-gray-opacity px-2 rounded-md focus:border-[2px]
                     focus:border-primary"
                >
                  <input
                    type="text"
                    placeholder="USD"
                    ref={priceCurrencyRef}
                    required
                    className="w-16 bg-gray-light-1 p-1 outline-none border-none
                     focus:border-primary rounded transition-all text-center"
                  />
                  <input
                    type="number"
                    placeholder="50"
                    ref={priceAmountRef}
                    required
                    className="w-20 bg-gray-light-1 p-1 outline-none border-none
                    focus:border-primary rounded transition-all text-center"
                  />
                </div>
              </div>
              {/* TODO: implement select of room amenities */}
              <div className="flex flex-col items-start justify-center mx-4 my-2 space-y-1">
                <label htmlFor="roomNumber">Room amenities</label>
                <input
                  type="text"
                  placeholder="Room amenities"
                  ref={amenitiesRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[1px]
                  border-gray-opacity focus:border-[2px] focus:border-primary 
                    rounded-md"
                />
              </div>
              {/* TODO: implement select of room view */}
              <div className="flex flex-col items-start justify-center mx-4 my-2 space-y-1">
                <label htmlFor="roomNumber">Room view</label>
                <input
                  type="text"
                  placeholder="Room view"
                  ref={roomViewRef}
                  required
                  className="w-full bg-gray-light-1 p-1 outline-none border-[1px]
                  border-gray-opacity focus:border-[2px] focus:border-primary 
                    rounded-md"
                />
              </div>
            </div>
            <div
              className="border-t-[1px] border-gray-opacity p-4 absolute bottom-0 
               right-0 left-0 z-50 bg-gray-light-1 rounded-bl-lg rounded-br-lg"
            >
              {!isLoading && (
                <Button type="submit" className="bg-gray-light-1 rounded-md">
                  Add Room
                </Button>
              )}
              {isLoading && <Loader />}
            </div>
          </form>
        </Modal>
      </div>
    </Fragment>
  );
};
