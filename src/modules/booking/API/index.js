import { url } from "../../../store";

export const addBooking = async ({
  userId,
  token,
  checkInDate,
  checkOutDate,
  numOfGuests,
  rooms,
  price,
}) => {
  const response = await fetch(`${url}/booking/add-booking`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      checkInDate,
      checkOutDate,
      numOfGuests,
      rooms,
      price,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
