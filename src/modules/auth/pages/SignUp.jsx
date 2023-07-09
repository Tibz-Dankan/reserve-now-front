import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signUp } from "../API";
import { authenticate } from "../../../store/actions/auth";
import { Button } from "../../../shared/UI/Button";
import { Footer } from "../../../shared/layouts/Footer";
import sprite from "../../../assets/icons/sprite.svg";

export const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
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

    // validate confirm password here

    if (!name || !email || !password || !country) return;
    console.log("email");
    console.log(email);
    console.log("password");
    console.log(password);

    mutate({ name, email, password, country });
  };

  return (
    <Fragment>
      <div className="min-h-[100vh]">
        <header className="flex items-center justify-end px-8 py-6">
          <Link
            to="/"
            className="px-2 py-1 rounded text-gray-light-1 bg-primary-dark"
          >
            Home
          </Link>
        </header>
        <div className=" flex items-center justify-center py-8">
          <span className="text-center font-bold text-gray-dark-1">
            ReserveNow
          </span>
        </div>
        <div className=" min-h-[80vh] flex items-start justify-center ">
          <form
            onSubmit={(event) => signUpHandler(event)}
            className="p-4 space-y-3 border-[1px] border-gray-400 rounded pb-5 min-w-[300px]"
          >
            <div>
              <p>Create an account</p>
            </div>
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label
                htmlFor="username"
                className="text-sm font-bold text-gray-dark-1"
              >
                Username
              </label>
              <svg className="fill-gray-dark-4 mr-1 h-[20px] w-[20px] absolute bottom-[10px] left-[8px]">
                <use href={`${sprite}#icon-person-small`}></use>
              </svg>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                 p-2 pl-8 rounded bg-gray-light-1 text-sm"
                type="text"
                ref={usernameRef}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-dark-1"
              >
                Email
              </label>
              <svg className="fill-gray-dark-4 mr-1 h-[20px] w-[20px] absolute bottom-[10px] left-[8px]">
                <use href={`${sprite}#icon-email-small`}></use>
              </svg>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                p-2  pl-8 rounded bg-gray-light-1 text-sm"
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label
                htmlFor="country"
                className="text-sm font-bold text-gray-dark-1"
              >
                Country
              </label>
              <svg className="fill-gray-dark-4 mr-1 h-[20px] w-[20px] absolute bottom-[10px] left-[8px]">
                <use href={`${sprite}#icon-global-small`}></use>
              </svg>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                p-2 pl-8 rounded bg-gray-light-1 text-sm"
                type="text"
                ref={countryRef}
                placeholder="Enter your username"
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
              <svg className="fill-gray-dark-4 mr-1 h-[20px] w-[20px] absolute bottom-[10px] left-[8px] stroke-gray-dark-4">
                <use href={`${sprite}#icon-password-small`}></use>
              </svg>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-dark hover:underline absolute right-0 top-[-4px] outline-none focus:underline"
              >
                Forgot password?
              </Link>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                p-2  pl-8 rounded bg-gray-light-1 text-sm"
                type="password"
                ref={passwordRef}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex flex-col justify-center relative space-y-[4px]">
              <label
                htmlFor="Confirm password"
                className="text-sm font-bold text-gray-dark-1"
              >
                Confirm password
              </label>
              <svg className="fill-gray-dark-4 mr-1 h-[20px] w-[20px] absolute bottom-[10px] left-[8px]">
                <use href={`${sprite}#icon-password-small`}></use>
              </svg>
              <input
                className="border-[1px] border-gray-400 focus:border-primary focus:bg-gray-200 transition-all outline-none 
                p-2  pl-8 rounded bg-gray-light-1 text-sm"
                type="password"
                ref={confirmPasswordRef}
                placeholder="Enter confirm password"
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
                  Create
                </Button>
              )}
              {isLoading && <Loader />}
            </div>
            <div>
              <span className="mr-1"> Already have an account?</span>
              <Link
                to="/signin"
                className="text-primary focus:underline hover:underline"
              >
                sign in
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
