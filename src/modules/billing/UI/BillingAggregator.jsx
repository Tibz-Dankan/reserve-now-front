import React, { Fragment, useState } from "react";
import { CreditCardBilling } from "./CreditCardBilling";
import { MobileMoneyBilling } from "./MobileMoneyBilling";

export const BillingAggregator = () => {
  const [label, setLabel] = useState("");
  const [showBillingOptions, setShowBillingOptions] = useState(false);

  const labelHandler = (label) => {
    setShowBillingOptions(() => true);
    setLabel(label);
  };

  const billingOptions = [
    {
      label: "card",
      component: <CreditCardBilling onUpdateLabel={labelHandler} />,
    },
    {
      label: "mobilemoney",
      component: <MobileMoneyBilling onUpdateLabel={labelHandler} />,
    },
    {
      label: "onsite",
      component: <div>pay onsite</div>,
    },
  ];
  return (
    <Fragment>
      <div>
        {!showBillingOptions && (
          <div className="space-y-6 flex flex-col items center justify-center p-8">
            <div className="bg-gray-light-3 rounded-md p-4 space-y-2">
              <div
                className="space-x-4 cursor-pointer"
                onClick={() => labelHandler("card")}
              >
                <input type="radio" className="cursor-pointer" />
                <label htmlFor="creditCard" className="cursor-pointer">
                  Credit card
                </label>
              </div>
              <div
                className="space-x-4 cursor-pointer"
                onClick={() => labelHandler("mobilemoney")}
              >
                <input type="radio" className="cursor-pointer" />
                <label htmlFor="mobileMoney" className="cursor-pointer">
                  Mobile money
                </label>
              </div>
            </div>
            <div className="bg-gray-light-3 p-4 rounded-md">
              <div
                className="space-x-4 cursor-pointer"
                onClick={() => labelHandler("onsite")}
              >
                <input type="radio" className="cursor-pointer" />
                <label htmlFor="payOnSite" className="cursor-pointer">
                  Pay onsite
                </label>
              </div>
            </div>
          </div>
        )}
        {showBillingOptions && (
          <div className="sm:w-full">
            {billingOptions.map((billingOption) => {
              return (
                <div key={billingOption.label}>
                  {billingOption.label === label && billingOption.component}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};
