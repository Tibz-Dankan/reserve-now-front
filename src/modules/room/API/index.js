import { url } from "../../../store";

export const getAllRooms = async () => {
  const response = await fetch(`${url}/rooms/get-all-rooms`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const getRoom = async (id) => {
  const response = await fetch(`${url}/rooms/get-room/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const addRoom = async ({
  roomNumber,
  roomType,
  capacity,
  price,
  priceCurrency,
  token,
}) => {
  const response = await fetch(`${url}/rooms/add-room`, {
    method: "POST",
    body: JSON.stringify({
      roomNumber,
      roomType,
      capacity,
      price,
      priceCurrency,
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

export const updateRoom = async ({
  id,
  roomNumber,
  roomType,
  capacity,
  price,
  priceCurrency,
  token,
}) => {
  const response = await fetch(`${url}/rooms/update-room/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      roomNumber,
      roomType,
      capacity,
      price,
      priceCurrency,
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
