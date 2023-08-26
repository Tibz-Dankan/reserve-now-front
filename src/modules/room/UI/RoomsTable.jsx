import React, { Fragment, useState } from "react";

export const RoomsTable = (props) => {
  const [rooms, setRooms] = useState(props.rooms);

  const roomsArrayLength = rooms?.length;
  return (
    <Fragment>
      <div className="table-container w-full flex items-center justify-center">
        <table className="border-collapse w-full ">
          <caption>All available rooms</caption>
          <thead>
            <tr>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Room Type
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Number of guests
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Price for 4 days
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Your Choices
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                Select Rooms
              </th>
              <th
                className="px-2 py-4 border border-primary-light
               text-gray-light-1 bg-primary-dark"
              >
                {"     empty   "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-24 ">
              <td className="border p-2 border-primary-light " rowSpan="3">
                Cottage King bed
              </td>
              <td className="border p-2 border-primary-light">
                Number of guests
              </td>
              <td className="border p-2 border-primary-light">
                Price for 4 days
              </td>
              <td className="border p-[2px] border-primary-light">
                Your Choices
              </td>
              <td className="border p-[2px] border-primary-light">
                Select Rooms
              </td>
              <td className="border p-[2px] border-primary-light" rowSpan="3">
                Reserve
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
