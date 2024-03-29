import React, { Fragment, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signUp } from "../API";
import { authenticate } from "../../../store/actions/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Loader } from "../../../shared/UI/Loader";
import { Button } from "../../../shared/UI/Button";
import countryList from "react-select-country-list";

export const SignUp = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const options = useMemo(() => {
    const countries = countryList().getData();
    if (countries[0].value !== "placeholder") {
      countries.unshift({ value: "placeholder", label: "Select your country" });
    }
    return countries;
  }, []);

  const countryChangeHandler = (event) => setCountry(event.target.value);

  const { isLoading, data, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (auth) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "Your account has been created successfully ",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const signUpHandler = (event) => {
    event.preventDefault();
    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!name || !email || !password || !country) return;
    if (password !== confirmPassword) return;
    mutate({ name, email, password, country });
  };

  const updateAuthLabel = (label) => {
    props.onUpdateLabel(label);
  };

  return (
    <Fragment>
      <form
        onSubmit={(event) => signUpHandler(event)}
        className="min-w-[300px] p-4 sm:p-8 sm:w-3/5"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Welcome!</h1>
          <p>Lets create your account</p>
        </div>
        <div className="overflow-x-hidden h-44 pr-2">
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="username" className="text-gray-dark-3">
              Username
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                   focus:bg-gray-200 transition-all outline-none p-2 rounded 
                   bg-gray-light-1 text-sm"
              type="text"
              ref={usernameRef}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="email" className="text-gray-dark-3">
              Email
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                   focus:bg-gray-200 transition-all outline-none p-2  rounded
                    bg-gray-light-1 text-sm"
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="country" className="text-gray-dark-3">
              Country
            </label>
            <select
              onChange={(event) => countryChangeHandler(event)}
              className="border-[1px] border-gray-400 focus:border-primary
                 focus:bg-gray-200  transition-all outline-none p-2 rounded
                 bg-gray-light-1 text-sm"
            >
              {options.map((country, index) => {
                return (
                  <option key={index} value={country.label}>
                    {country.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="password" className="text-gray-dark-3">
              Password
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                 focus:bg-gray-200 transition-all outline-none  p-2  rounded
                 bg-gray-light-1 text-sm"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="confirm password" className="text-gray-dark-3">
              Confirm password
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                  focus:bg-gray-200 transition-all outline-none  p-2  rounded
                  bg-gray-light-1 text-sm"
              type="password"
              ref={confirmPasswordRef}
              placeholder="Enter confirm password"
              required
            />
          </div>
        </div>
        <div
          className="w-full mt-6 flex items-center justify-center
                bg-primary rounded border-t-[1px] border-gray-opacity"
        >
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Sign up
            </Button>
          )}
          {isLoading && <Loader label="Signing up" className="w-40" />}
        </div>
        <div className="w-full mt-4 flex items-center justify-start gap-x-1">
          <span>Already have an account?</span>
          <span
            onClick={() => updateAuthLabel("signin")}
            className="cursor-pointer focus:underline hover:underline
                  text-primary ml-2"
          >
            SignIn
          </span>
        </div>
      </form>
    </Fragment>
  );
};
