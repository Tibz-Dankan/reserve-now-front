import { bookingActions } from "../index";

export const updateBookingStage = (nextStage) => {
  localStorage.setItem("bookingStage", JSON.stringify(nextStage));
  return (dispatch) => {
    dispatch(bookingActions.updateBookingStage({ bookingStage: nextStage }));
  };
};

export const updateNewBooking = (newBookingObj) => {
  localStorage.setItem("newBooking", JSON.stringify(newBookingObj));
  return (dispatch) => {
    dispatch(bookingActions.updateNewBooking({ newBooking: newBookingObj }));
  };
};

export const clearBookingStage = () => {
  localStorage.removeItem("bookingStage");
  return (dispatch) => {
    dispatch(bookingActions.clearStage());
  };
};

export const clearBooking = () => {
  localStorage.removeItem("bookingStage");
  localStorage.removeItem("newBooking");
  return (dispatch) => {
    dispatch(bookingActions.clearBooking());
  };
};
