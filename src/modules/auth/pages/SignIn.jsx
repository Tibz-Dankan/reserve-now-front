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
import sprite from "../../../assets/icons/sprite.svg";

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
      <div className="min-h-[100vh]">
        <header className="flex items-center justify-end px-8">
          <Link to="/">Home</Link>
        </header>
        <div className=" flex items-center justify-center py-8">
          <span className="text-center font-bold text-gray-dark-1">
            ReserveNow
          </span>
        </div>
        <div className=" min-h-[80vh] flex items-start justify-center ">
          <form
            onSubmit={(event) => signInHandler(event)}
            className="p-4 space-y-3 border-[1px] border-gray-400 rounded pb-5 min-w-[300px]"
          >
            <div>
              <p>Sign in your account</p>
            </div>
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-dark-1"
              >
                Email
              </label>
              <svg className="fill-gray-500 mr-1 h-[20px] w-[20px] absolute bottom-[8px] left-[8px]">
                <use href={`${sprite}#icon-email`}></use>
              </svg>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                p-[4px]  pl-8 rounded bg-gray-light-1"
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-dark-1"
              >
                Password
              </label>
              <svg className="fill-gray-500 mr-1 h-[20px] w-[20px] absolute bottom-[8px] left-[8px]">
                <use href={`${sprite}#icon-password`}></use>
              </svg>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-dark absolute right-0 top-[-4px] outline-none focus:underline"
              >
                Forgot password?
              </Link>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                p-[4px]  pl-8 rounded bg-gray-light-1"
                type="password"
                ref={passwordRef}
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <input type="checkbox" className="mr-2 focus:bg-primary" />
              <label htmlFor="password" className="text-sm">
                Remember me
              </label>
            </div>

            <div className="w-full mt-2">
              {!isLoading && (
                <Button className="w-full" type="submit">
                  Sign in
                </Button>
              )}
              {isLoading && <Loader />}
            </div>
            <div>
              <span className="mr-1"> Don't have an account?</span>
              <Link
                to="/signup"
                className="text-primary focus:underline hover:underline"
              >
                sign up
              </Link>
            </div>
          </form>
          {/* <div>some cool image on the side</div> */}
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
