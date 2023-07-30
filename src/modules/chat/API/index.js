import { url } from "../../../store";

export const getChatRecipients = async (userId, token) => {
  const response = await fetch(`${url}/chat/get-chat-recipients/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  //   const data = await response.json();
  //   console.log("response.json()");
  //   console.log(data.data);
  //   return data.data;
  return await response.json();
};
