import { url } from "../../../store";

// signin
export const signIn = async ({ email, password }) => {
  const response = await fetch(`${url}/users/signin`, {
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
export const signUp = async ({ name, email, password, country }) => {
  const response = await fetch(`${url}/users/signup`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      country,
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
