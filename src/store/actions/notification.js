import { notificationActions } from "../index";

export const showAlert = ({ type, message }) => {
  return (dispatch) => {
    dispatch(notificationActions.showAlert({ type: type, message: message }));
  };
};

export const hideAlert = () => {
  return (dispatch) => {
    dispatch(notificationActions.hideAlert());
  };
};

export const showCardNotification = ({ type, message }) => {
  return (dispatch) => {
    dispatch(
      notificationActions.showCardNotification({ type: type, message: message })
    );
  };
};

export const hideCardNotification = () => {
  return (dispatch) => {
    dispatch(notificationActions.hideCardNotification());
  };
};
