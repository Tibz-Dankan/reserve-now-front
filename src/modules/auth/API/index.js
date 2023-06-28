import { url } from "../../../store";

// signin
export const signIn = async ({ email, password }) => {
  const response = await fetch(`${url}/api/users/login`, {
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
    console.log(response);
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

// signup
