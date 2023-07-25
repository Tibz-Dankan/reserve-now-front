import { Fragment } from "react";

// export const MessageSecondary = ({msg}) => {
export const MessageSecondary = () => {
  const showTime = true;
  return (
    <Fragment>
      <div>
        <div className="mt-1 ml-9  inline-block">
          {showTime && (
            <p className="text-sm text-gray-500 text-end pr-4">8:16 PM</p>
          )}
          <p
            className="text-sm text-gray-light-2 bg-primary p-4 rounded-2xl 
            relative w-auto max-w-[300px] min-h-[32px]"
          >
            this is secondary message for the chat this is secondary message for
            the chat this is secondary message
          </p>
        </div>
      </div>
    </Fragment>
  );
};
