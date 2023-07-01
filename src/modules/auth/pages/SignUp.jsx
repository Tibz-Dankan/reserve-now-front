import React, { Fragment, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signUp } from "../API";
import { authenticate } from "../../../store/actions/auth";

export const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const countryRef = useRef(null);
  const dispatch = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (auth) => {
      console.log(auth);
      dispatch(authenticate(auth));
      //  dispatch success notification
    },
    onError: (error) => {
      console.log("error.message");
      console.log(error.message);
      //  dispatch error notification to show error message
      // throw an error message
    },
  });

  console.log("data auth");
  console.log(data);

  const signUpHandler = (event) => {
    event.preventDefault();
    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const country = countryRef.current.value;

    if (!name || !email || !password || !country) return;
    console.log("email");
    console.log(email);
    console.log("password");
    console.log(password);

    mutate({ name, email, password, country });
  };

  return (
    <Fragment>
      <div>
        <div>
          <form onSubmit={(event) => signUpHandler(event)}>
            <input
              type="text"
              ref={usernameRef}
              placeholder="Username"
              required
            />
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter email"
              required
            />
            <input
              type="text"
              ref={countryRef}
              placeholder="Enter country"
              required
            />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter password"
              required
            />
            {!isLoading && <button type="submit">Sign Up</button>}
            {isLoading && <span>signing in...</span>}
          </form>
          <div>some cool image on the side</div>
        </div>
      </div>
    </Fragment>
  );
};
