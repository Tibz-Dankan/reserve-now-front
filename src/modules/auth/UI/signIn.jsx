import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signIn } from "../API";
import { authenticate } from "../../../store/actions/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Loader } from "../../../shared/UI/Loader";
import { Button } from "../../../shared/UI/Button";
import { Footer } from "../../../shared/layouts/Footer";
import { Modal } from "../../../shared/UI/Modal";
import sprite from "../../../assets/icons/sprite.svg";
import personPlaceHolder from "../../../assets/Images/person.png";

export const SignIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const { isLoading, data, mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (auth) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "You have logged in successfully",
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

  const signInHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) return;
    console.log("email");
    console.log(email);
    console.log("password");
    console.log(password);

    mutate({ email, password });
  };

  return (
    <Fragment>
      <Modal
        openModalElement={<span className="cursor-pointer">SignIn</span>}
        className="fixed top-[15vh] left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[540px] md:left-[15%] md:w-[540px] xl:left-[20%] xl:w-[540px]"
      >
        <div className="sm:w-full relative">
          <form
            onSubmit={(event) => signInHandler(event)}
            className="p-4 sm:p-8 sm:w-3/5"
          >
            <div className="mb-6">
              <h1 className="font-bold text-3xl text-gray-dark-3">
                Welcome back
              </h1>
              <p>Sign in your account</p>
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
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label htmlFor="password" className="text-gray-dark-3">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-dark hover:underline focus:underline
                absolute right-0 top-[-2px] outline-none"
              >
                Forgot password?
              </Link>
              <input
                className="border-[1px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2 rounded
               bg-gray-light-1 text-sm"
                type="password"
                ref={passwordRef}
                placeholder="Enter your password"
                required
              />
            </div>
            <div
              className="w-full mt-6 flex items-center justify-center
                bg-primary rounded"
            >
              {!isLoading && (
                <Button className="font-bold" type="submit">
                  Sign in
                </Button>
              )}
              {isLoading && <Loader label="Signing in" className="w-40" />}
            </div>
            <div className="w-full mt-4">
              <span>Don't have an account?</span>
              <span
                className="cursor-pointer focus:underline hover:underline
                  text-primary ml-2"
              >
                Sign up
              </span>
            </div>
          </form>
          <div
            className="sm:w-2/5 h-full bg-primary flex items-center 
            justify-center absolute top-0 right-0 z-0 rounded-br-lg rounded-tr-lg"
          >
            <div className="relative">
              <div
                className="w-48 h-48 border-[38px] border-primary rounded-[50%]
                 absolute"
              ></div>
              <div className="w-48 h-48 flex items-center justify-center">
                <img
                  src={personPlaceHolder}
                  alt="person-placeholder"
                  className="w-32 h-32"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
