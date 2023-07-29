/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { AppDate } from "../../../shared/utils/appDate";

export const MessageSecondary = ({ msg }) => {
  const time = () => new AppDate(msg?.createdAt).time();

  return (
    <Fragment>
      <div>
        <div className="mt-1 ml-9  inline-block">
          {msg.showTime && (
            <p className="text-sm text-gray-500 text-end pr-4">{time()}</p>
          )}
          <p
            className="text-sm text-gray-light-2 bg-primary p-4 rounded-2xl 
            relative w-auto max-w-[300px] min-h-[32px]"
          >
            {msg.message}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
