import { Fragment } from "react";

// export const MessageSecondary = ({msg}) => {
export const MessageSecondary = () => {
  return (
    <Fragment>
      <div>
        <div className="mt-6 ml-9 relative inline-block">
          <span className="text-sm text-gray-500 absolute -top-5 right-1">
            8:16 PM
          </span>
          <p
            className="text-sm text-gray-900 bg-gray-light-3 p-4 rounded-xl 
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
