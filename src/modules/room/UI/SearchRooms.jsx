import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchRooms } from "../API";
import { updateSearchRoomResults } from "../../../store/actions/room";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import sprite from "../../../assets/icons/sprite.svg";
import { RoomsTable } from "./RoomsTable";

export const SearchRooms = () => {
  let [checkInDate, setCheckInDate] = useState(new Date());
  let [checkOutDate, setCheckOutDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenArray, setChildrenArray] = useState([]);
  const [childAge, setChildAge] = useState([]);
  const [rooms, setRooms] = useState(1);
  const [showCheckInPlaceholder, setShowCheckInPlaceholder] = useState(true);
  const [showCheckOutPlaceholder, setShowCheckOutPlaceholder] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [checkInCalendarOpen, setCheckInCalendarOpen] = useState(false);
  const [checkOutCalendarOpen, setCheckOutCalendarOpen] = useState(false);

  const dispatch = useDispatch();

  const age = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const isLessThanEqualOneAdult = adults <= 1;
  const isLessThanEqualOneRoom = rooms <= 1;
  const isLessThanEqualZeroChild = children <= 0;
  const hasChild = children > 0;

  const checkInDateString = checkInDate && new Date(checkInDate).toDateString();
  const checkOutDateString =
    checkOutDate && new Date(checkOutDate).toDateString();
  const checkInMillSec = new Date(checkInDate).getTime();
  const checkOutMillSec = new Date(checkOutDate).getTime();
  const nowMillSec = new Date().getTime();

  const isCheckOutEqualCheckIn = checkInMillSec === checkOutMillSec;
  const isCheckOutLessThanCheckIn = checkOutMillSec < checkInMillSec;

  const isInvalidCheckInDate = nowMillSec > checkInMillSec;
  const isInvalidCheckOutDate =
    isCheckOutLessThanCheckIn || isCheckOutEqualCheckIn;

  const checkInDateHandler = (date) => {
    setCheckInDate(date);
    setCheckInCalendarOpen(false);
    setShowCheckInPlaceholder(false);
  };

  const checkOutDateHandler = (date) => {
    setCheckOutDate(date);
    setCheckOutCalendarOpen(false);
    setShowCheckOutPlaceholder(false);
  };

  // create an array based on the number of children
  useEffect(() => {
    const incrementChildrenArray = () => {
      const childrenArr = [];
      for (let index = 0; index < children; index++) {
        childrenArr.push(index + 1);
      }
      setChildrenArray(childrenArr);
    };
    incrementChildrenArray();
  }, [children, setChildrenArray]);

  const [isRemoveLastAge, setIsRemoveLastAge] = useState(false);
  useEffect(() => {
    const removeLastChildAge = () => {
      const newChildAge = [];
      for (let index = 0; index < children; index++) {
        newChildAge.push(childAge[index]);
      }
      setChildAge(newChildAge);
    };
    removeLastChildAge();
  }, [isRemoveLastAge]);

  const childAgeHandler = (event) => {
    let eachChildAge = {};
    const selectedId = event.target.id;
    const selectedValue = event.target.value;
    eachChildAge[`${selectedId}`] = selectedValue;

    if (!childAge[0]) {
      setChildAge([eachChildAge]);
      return;
    }
    let childAgeArr = [];
    let isChildAgePresent = false;

    childAge.map((childAg) => {
      const currProp = Object.keys(childAg)[0];
      if (currProp === selectedId) {
        childAg[currProp] = selectedValue;
        isChildAgePresent = true;
      }
      childAgeArr.push(childAg);
    });
    if (isChildAgePresent) return;
    childAgeArr.push(eachChildAge);
    setChildAge(childAgeArr);
  };

  const dateErrorHandler = () => {
    let error = null;
    if (!checkInDate || !checkOutDate) error = "Please select dates";
    if (isInvalidCheckInDate) error = "Please provide valid check-in date";
    if (isInvalidCheckOutDate) error = "Please provide  valid check-out date";
    if (error) {
      dispatch(
        showCardNotification({
          type: "error",
          message: error,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      throw new Error(error);
    }
  };

  const guestErrorHandler = () => {
    let error = null;
    if (adults < 1) error = "Adults must at least be 1";
    if (rooms < 1) error = "Rooms must at least be 1";
    if (children >= 1 && childAge === null) {
      error = "Child's age must be provided";
    }
    if (error) {
      dispatch(
        showCardNotification({
          type: "error",
          message: error,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      throw new Error(error);
    }
  };

  const { isLoading, data, mutate } = useMutation({
    mutationFn: searchRooms,
    onSuccess: (data) => {
      dispatch(updateSearchRoomResults(data.data));
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const searchRoomHandler = (event) => {
    event.preventDefault();
    dateErrorHandler();
    guestErrorHandler();
    checkInDate = new Date(checkInDate).toISOString();
    checkOutDate = new Date(checkOutDate).toISOString();
    mutate({ checkInDate, checkOutDate, adults, children, childAge, rooms });
  };

  const availableRooms = data?.data;

  return (
    <Fragment>
      <div className="px-6 flex flex-col items-center">
        <div className="inline-block relative">
          <form
            className=" space-y-2 lg:space-y-0 lg:flex items-center"
            onSubmit={(event) => searchRoomHandler(event)}
          >
            <div className="flex items-center justify-start gap-x-1 border-2 rounded border-primary-dark px-2 py-[3px]">
              <svg className="fill-gray-dark-4 h-[20px] w-[20px] ">
                <use href={`${sprite}#icon-calendar`}></use>
              </svg>
              {!checkInCalendarOpen && (
                <span
                  onClick={() => setCheckInCalendarOpen(true)}
                  className="cursor-pointer"
                >
                  {showCheckInPlaceholder ? "Check-in date" : checkInDateString}
                </span>
              )}
              {checkInCalendarOpen && (
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => checkInDateHandler(date)}
                  autoFocus={checkInCalendarOpen}
                />
              )}
              <span>-</span>
              {!checkOutCalendarOpen && (
                <span
                  onClick={() => setCheckOutCalendarOpen(true)}
                  className="cursor-pointer"
                >
                  {showCheckOutPlaceholder
                    ? "Check-out date"
                    : checkOutDateString}
                </span>
              )}
              {checkOutCalendarOpen && (
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => checkOutDateHandler(date)}
                  autoFocus={checkOutCalendarOpen}
                />
              )}
            </div>
            <div
              className="flex items-center justify-start gap-x-1  cursor-pointer
              border-2 rounded border-primary-dark px-2 py-1 relative"
              onClick={() => setShowDropDown(!showDropDown)}
            >
              <svg className="fill-gray-dark-1 mr-1 h-[24px] w-[24px]">
                <use href={`${sprite}#icon-person`}></use>
              </svg>
              <div>
                <span className="mr-1">{adults}</span>
                <label htmlFor="adults">adults</label>
              </div>
              <svg className="fill-gray-dark-2 h-[12px] w-[12px]">
                <use href={`${sprite}#icon-dot`}></use>
              </svg>
              <div>
                <span className="mr-1">{children}</span>
                <label htmlFor="child">child</label>
              </div>
              <svg className="fill-gray-dark-2 h-[12px] w-[12px]">
                <use href={`${sprite}#icon-dot`}></use>
              </svg>
              <div className="mr-6">
                <span className="mr-1">{rooms}</span>
                <label htmlFor="room">room</label>
              </div>
              <svg className="fill-gray-dark-4 h-[16px] w-[16px] absolute right-3 lg:right-2 top-2">
                <use href={`${sprite}#icon-chevron-down`}></use>
              </svg>
            </div>
            <div className="flex items-center justify-end">
              {!isLoading && <Button>Search</Button>}
              {isLoading && <Loader />}
            </div>
          </form>

          {showDropDown && (
            <div
              className=" bg-gray-light-1 flex flex-col items-center p-6 w-[300px] border-[1px]
              border-gray-opacity  gap-y-2 rounded shadow-xl absolute top-[80px] lg:top-[40px] 
              right-0 lg:right-[76px] z-[60] animate-slideDownDropDown"
            >
              <div className="flex items-center justify-between  gap-x-12 w-full">
                <span>Adults</span>
                <div className="flex items-center justify-center gap-x-5 border-2 border-gray-dark-1 w-[112px] px-3 pt-1 pb-[6px] rounded">
                  <button
                    className="text-[32px] text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-light-4"
                    onClick={() => setAdults((adult) => adult - 1)}
                    disabled={isLessThanEqualOneAdult}
                  >
                    -
                  </button>
                  <span>{adults}</span>
                  <button
                    className="text-[24px] text-primary cursor-pointer"
                    onClick={() => setAdults((adult) => adult + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between  gap-x-12 w-full">
                <span>children</span>
                <div className="flex items-center justify-center gap-x-5 border-2 border-gray-dark-1 w-[112px] px-3 pt-1 pb-[6px] rounded">
                  <button
                    className="text-[32px] text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-light-4"
                    onClick={() => {
                      setChildren((children) => children - 1),
                        setIsRemoveLastAge(!isRemoveLastAge);
                    }}
                    disabled={isLessThanEqualZeroChild}
                  >
                    -
                  </button>
                  <span>{children}</span>
                  <button
                    className="text-[24px] text-primary cursor-pointer"
                    onClick={() => setChildren((children) => children + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              {hasChild &&
                childrenArray.map((_, index) => {
                  return (
                    <div key={index} className="w-full">
                      <select
                        onChange={(event) => childAgeHandler(event)}
                        value={childAge[index + 1]}
                        defaultValue={childAge[index + 1]}
                        id={`child${index + 1}`}
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
                  );
                })}
              <div className="flex items-center justify-between  gap-x-12 w-full">
                <span>Rooms</span>
                <div className="flex items-center justify-center gap-x-5 border-2 border-gray-dark-1 w-[112px] px-3 pt-1 pb-[6px] rounded">
                  <button
                    className="text-[32px] text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-light-4"
                    onClick={() => setRooms((rooms) => rooms - 1)}
                    disabled={isLessThanEqualOneRoom}
                  >
                    -
                  </button>
                  <span>{rooms}</span>
                  <button
                    className="text-[24px] text-primary cursor-pointer"
                    onClick={() => setRooms((rooms) => rooms + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className=" w-full">
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => setShowDropDown(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* <RoomsTable /> */}
      </div>
    </Fragment>
  );
};
