import { url } from "../../../store";

// signin
export const signIn = async ({ email, password }) => {
  const response = await fetch(`${url}/api/v1/users/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
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

// signup
