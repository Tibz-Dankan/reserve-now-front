import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { searchRooms } from "../API";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import sprite from "../../../assets/icons/sprite.svg";

export const SearchRooms = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [childAge, setChildAge] = useState(0);
  const [rooms, setRooms] = useState(0);

  const [showCardNumber, setShowCardNumber] = useState(false);

  const dispatch = useDispatch();

  const checkInDateHandler = (event) => {
    const checkIn = new Date(event.target.value).toISOString();
    setCheckInDate(checkIn);
  };

  const checkOutDateHandler = (event) => {
    const checkOut = new Date(event.target.value).toISOString();
    setCheckOutDate(checkOut);
  };
  const adultsHandler = (event) => setAdults(event.target.value);
  const childrenHandler = (event) => setChildren(event.target.value);
  const childAgeHandler = (event) => setChildAge(event.target.value);

  const age = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const { isLoading, data, mutate } = useMutation({
    mutationFn: searchRooms,
    // onSuccess: (data) => {
    //   dispatch(
    //     showCardNotification({ type: "success", message: data.message })
    //   );
    //   setTimeout(() => {
    //     dispatch(hideCardNotification());
    //   }, 5000);
    // },
    onError: (error) => {
      console.log("error");
      console.log(error);
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const searchRoomHandler = (event) => {
    event.preventDefault();
    mutate({ checkInDate, checkOutDate, adults, children, childAge, rooms });
  };

  const availableRooms = data?.data;
  console.log("rooms");
  console.log(availableRooms);

  return (
    <Fragment>
      <div className="px-6 relative">
        <form
          className="flex items-center"
          onSubmit={(event) => searchRoomHandler(event)}
        >
          <div className="flex items-center justify-start gap-x-1 border-2 rounded border-primary-dark px-2 py-[3px]">
            <svg className="fill-gray-dark-4 h-[20px] w-[20px] ">
              <use href={`${sprite}#icon-calendar`}></use>
            </svg>
            <input
              type="date"
              onChange={(event) => checkInDateHandler(event)}
              placeholder="Check-in date"
            />
            {/* To be changed to svg icon */}
            <span>-</span>
            <input
              type="date"
              placeholder="check-out date"
              onChange={(event) => checkOutDateHandler(event)}
            />
          </div>
          <div className="flex items-center justify-start gap-x-1 border-2 rounded border-primary-dark px-2 py-1">
            <svg className="fill-gray-dark-1 mr-1 h-[24px] w-[24px]">
              <use href={`${sprite}#icon-person`}></use>
            </svg>
            <div>
              <span className="mr-1">{adults}</span>
              <label htmlFor="adults">adults</label>
            </div>
            {/* To be changed to svg */}
            <span>.</span>
            <div>
              <span className="mr-1">{children}</span>
              <label htmlFor="child">child</label>
            </div>
            {/* To be changed to svg */}
            <span>.</span>
            <div>
              <span className="mr-1">{rooms}</span>
              <label htmlFor="room">room</label>
            </div>
            <svg
              className="fill-gray-dark-4 h-[16px] w-[16px] ml-4"
              onClick={() => setShowCardNumber(true)}
            >
              <use href={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </div>
          <div>
            {!isLoading && <Button>Search</Button>}
            {isLoading && <Loader />}
          </div>
        </form>

        {showCardNumber && (
          <div
            className=" bg-gray-light-1 flex flex-col items-center p-6 w-[300px] border-[1px]
         border-gray-opacity  gap-y-2 rounded shadow-xl absolute top-[40px] right-[20px] "
          >
            <div className="flex items-center justify-between  gap-x-12 w-full">
              <span>Adults</span>
              <div className="flex items-center justify-center gap-x-5 border-2 border-gray-dark-1 w-[112px] px-3 pt-1 pb-[6px] rounded">
                <span
                  className="text-[32px] text-primary cursor-pointer"
                  onClick={() => setAdults((adult) => adult - 1)}
                >
                  -
                </span>
                <span>{adults}</span>
                <span
                  className="text-[24px] text-primary cursor-pointer"
                  onClick={() => setAdults((adult) => adult + 1)}
                >
                  +
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between  gap-x-12 w-full">
              <span>children</span>
              <div className="flex items-center justify-center gap-x-5 border-2 border-gray-dark-1 w-[112px] px-3 pt-1 pb-[6px] rounded">
                <span
                  className="text-[32px] text-primary cursor-pointer"
                  onClick={() => setChildren((children) => children - 1)}
                >
                  -
                </span>
                <span>{children}</span>
                <span
                  className="text-[24px] text-primary cursor-pointer"
                  onClick={() => setChildren((children) => children + 1)}
                >
                  +
                </span>
              </div>
            </div>
            <div className="w-full">
              <select
                onChange={(event) => setChildAge(event.target.value)}
                value={childAge}
              >
                <option>Age is needed</option>
                {age.map((age, index) => {
                  if (age === 1) {
                    return (
                      <option value={age} key={index}>
                        {age} year
                      </option>
                    );
                  }
                  return (
                    <option value={age} key={index}>
                      {age} years
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-center justify-between  gap-x-12 w-full">
              <span>Rooms</span>
              <div className="flex items-center justify-center gap-x-5 border-2 border-gray-100 w-[112px] px-3 pt-1 pb-[6px] rounded">
                <span
                  className="text-[32px] text-primary cursor-pointer"
                  onClick={() => setRooms((rooms) => rooms - 1)}
                >
                  -
                </span>
                <span>{rooms}</span>
                <span
                  className="text-[24px] text-primary cursor-pointer"
                  onClick={() => setRooms((rooms) => rooms + 1)}
                >
                  +
                </span>
              </div>
            </div>
            <div className=" w-full">
              <Button
                className="w-full"
                type="button"
                onClick={() => setShowCardNumber(false)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
