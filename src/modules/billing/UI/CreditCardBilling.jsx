import React, { Fragment, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { Button } from "../../../shared/UI/Button";
import { Loader } from "../../../shared/UI/Loader";
import { useSelector, useDispatch } from "react-redux";
import { billCard } from "../API";
import { updateBookingStage } from "../../../store/actions/booking";
import { useMutation } from "@tanstack/react-query";

export const CreditCardBilling = (props) => {
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const [cardNumber, setCardNumber] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [saveCardInfo, setSaveCardInfo] = useState(false);

  const dispatch = useDispatch();

  const updateBillingLabel = (label) => {
    props.onBillingLabel(label);
  };

  const cardNumberHandler = (event) => setCardNumber(event.target.value);
  const cvvHandler = (event) => setCvv(event.target.value);
  const cardExpiryDateHandler = (event) => {
    setCardExpiryDate(event.target.value);
    const expDateString = event.target.value?.toString();
    const expArr = expDateString.split("");
    console.log("expArr ", expArr);
    if (expDateString.trim().length !== 4) {
      console.log("Invalid exp date input");
      return;
    }
    const dateString = `${expArr[2]}${expArr[3]}-${expArr[0]}${expArr[1]}`;
    console.log("dateString ", dateString);
    const cardExpiryDateString = new new Date(`${dateString}`).toISOString();

    console.log("cardExpiryDateString", cardExpiryDateString);

    // setCardExpiryDate(cardExpiryDateString);
    setCardExpiryDate(event.target.value);
  };

  //   TODO: a function to handle card expiry date value
  //   TODO: a function to validate card number value

  const { isLoading, data, mutate } = useMutation({
    mutationFn: billCard,
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

  const billCardHandler = (event) => {
    event.preventDefault();

    if (!userId || !cardNumber || !cvv || !cardExpiryDate) return;
    console.log("cardExpiryDate", cardExpiryDate);

    mutate({ userId, token, cardNumber, cvv, cardExpiryDate, saveCardInfo });
  };

  return (
    <Fragment>
      <div className="pt-4 p-8 text-gray-dark-3 space-y-2">
        <div className="bg-gray-light-3 inline-block p-2 relative rounded">
          <span className="bg-primary h-full w-2 absolute left-0 top-0"></span>
          <span className="ml-2">#B0000025</span>
          <span className="ml-2">Due amount : USD 750</span>
        </div>
        <form
          onSubmit={(event) => billCardHandler(event)}
          className="space-y-4"
        >
          <div className="w-full flex items-center justify-start gap-x-4">
            <h2 className="font-semibold text-xl">Billing your card</h2>
            <svg className="w-6 h-6 fill-gray-dark-2">
              <use href={`${sprite}#icon-billing`}></use>
            </svg>
          </div>
          <div
            className="relative flex flex-col items-start justify-center 
             w-full gap-y-1"
          >
            <label htmlFor="cardNumber">Card number</label>
            <input
              type="number"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={(event) => cardNumberHandler(event)}
              className="border-[1px] border-gray-400 focus:border-[2px]
               focus:border-primary focus:bg-gray-200 transition-all 
               outline-none p-2  rounded  bg-gray-light-1 text-sm w-full"
              required
            />
          </div>
          <div className="flex items justify-between gap-x-8">
            <div
              className="relative flex flex-col items-start justify-center 
                  w-full gap-y-1"
            >
              <label htmlFor="ExpiryDate">Expiry date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiryDate}
                onChange={(event) => cardExpiryDateHandler(event)}
                className="border-[1px] border-gray-400 focus:border-[2px]
                 focus:border-primary focus:bg-gray-200 transition-all 
                 outline-none p-2  rounded  bg-gray-light-1 text-sm w-full"
                required
              />
            </div>{" "}
            <div
              className="relative flex flex-col items-start justify-center
                  w-full gap-y-1"
            >
              <label htmlFor="cardNumber">Card code(CVV)</label>
              <input
                type="number"
                placeholder="CVV"
                value={cvv}
                onChange={(event) => cvvHandler(event)}
                className="border-[1px] border-gray-400 focus:border-[2px]
                 focus:border-primary focus:bg-gray-200 transition-all 
                  outline-none p-2  rounded  bg-gray-light-1 text-sm w-full"
                required
              />
            </div>
          </div>
          <div className="relative flex  items-center justify-start w-full gap-x-2">
            <input
              type="checkbox"
              className=""
              onClick={() => setSaveCardInfo(!saveCardInfo)}
            />
            <label htmlFor="cardNumber">
              Save card information for future use
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
              onClick={() => updateBillingLabel("mobilemoney")}
            >
              Use mobile money instead
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
