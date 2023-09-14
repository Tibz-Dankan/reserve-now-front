import React, { Fragment, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { useSelector, useDispatch } from "react-redux";
import { billMobileMoney } from "../API";
import { updateBookingStage } from "../../../store/actions/booking";
import { useMutation } from "@tanstack/react-query";

export const MobileMoneyBilling = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [savePhoneNumber, setSavePhoneNumber] = useState(false);

  const dispatch = useDispatch();

  const updateBillingLabel = (label) => {
    props.onBillingLabel(label);
  };

  const cardNumberHandler = (event) => setPhoneNumber(event.target.value);

  const { isLoading, data, mutate } = useMutation({
    mutationFn: billMobileMoney,
    onSuccess: (data) => {
      dispatch(
        showCardNotification({
          type: "success",
          message: data.message,
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      dispatch(updateBookingStage(3));
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const billMobileMoneyHandler = (event) => {
    event.preventDefault();

    if (!userId || !phoneNumber) return;

    mutate({
      userId,
      token,
      phoneNumber,
      savePhoneNumber,
    });
  };
  return (
    <Fragment>
      <div className="pt-4 p-8 text-gray-dark-3 space-y-2">
        <div className="bg-gray-light-3 inline-block p-2 relative rounded">
          <span className="bg-primary h-full w-2 absolute left-0 top-0"></span>
          {/* TODO: to change the booking values below to dynamic values */}
          <span className="ml-2">#B0000025</span>
          <span className="ml-2">Due amount : USD 750</span>
        </div>
        <form
          onSubmit={(event) => billMobileMoneyHandler(event)}
          className="space-y-4"
        >
          <div className="w-full flex items-center justify-start gap-x-4">
            <h2 className="font-semibold text-xl">
              Billing your mobile money{" "}
            </h2>
            <svg className="w-6 h-6 fill-gray-dark-2">
              <use href={`${sprite}#icon-billing`}></use>
            </svg>
          </div>
          <div
            className="relative flex flex-col items-start justify-center 
             w-full gap-y-1"
          >
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="number"
              placeholder="2567xxxxxxxxx"
              value={phoneNumber}
              onChange={(event) => cardNumberHandler(event)}
              className="border-[1px] border-gray-400 focus:border-[2px]
               focus:border-primary focus:bg-gray-200 transition-all 
               outline-none p-2  rounded  bg-gray-light-1 text-sm w-full"
              required
            />
          </div>
          <div className="relative flex  items-center justify-start w-full gap-x-2">
            <input
              type="checkbox"
              className=""
              onClick={() => setSavePhoneNumber(!savePhoneNumber)}
            />
            <label htmlFor="savePhoneNumber">
              Save phone number for future use
            </label>
          </div>
          <div
            className="w-full flex items-center justify-center
                bg-primary rounded"
          >
            {!isLoading && (
              <Button className="font-bold" type="submit">
                Pay
              </Button>
            )}
            {isLoading && <Loader label="Paying" className="w-40" />}
          </div>
          <div className="flex items-center justify-start">
            <svg className="w-6 h-6 fill-gray-dark-2">
              <use href={`${sprite}#icon-dot`}></use>
            </svg>
            <p
              className="cursor-pointer focus:underline hover:underline
              hover:text-primary"
              onClick={() => updateBillingLabel("card")}
            >
              Use credit card instead
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
