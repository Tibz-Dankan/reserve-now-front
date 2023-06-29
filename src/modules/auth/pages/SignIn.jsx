import React, { Fragment, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signIn } from "../API";
import { authenticate } from "../../../store/actions/auth";

export const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (auth) => {
      dispatch(authenticate(auth));
      //  dispatch success notification
    },
    onError: (error) => {
      console.log(error.message);
      //  dispatch error message
      // throw an error message
    },
  });

  console.log("data auth");
  console.log(data);

  const signInHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) return;
    mutate({ email, password });
  };

  return (
    <Fragment>
      <div>
        <div>
          <form onSubmit={(event) => signInHandler(event)}>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter email"
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
