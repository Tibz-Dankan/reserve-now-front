import { url } from "../../../store";

export const billCard = async ({
  userId,
  token,
  cardNumber,
  cardExpiryDate,
  cvv,
  saveCardInfo,
}) => {
  const response = await fetch(`${url}/billing/bill-card`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      cardNumber,
      cardExpiryDate,
      cvv,
      saveCardInfo,
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
