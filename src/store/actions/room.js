import { roomActions } from "../index";

export const updateAddRoomStage = (nextStage) => {
  localStorage.setItem("addRoomStage", JSON.stringify(nextStage));
  return (dispatch) => {
    dispatch(roomActions.updateAddRoomStage({ addRoomStage: nextStage }));
  };
};

export const updateNewRoom = (newRoomObj) => {
  localStorage.setItem("newRoom", JSON.stringify(newRoomObj));
  return (dispatch) => {
    dispatch(roomActions.updateNewRoom({ newRoom: newRoomObj }));
  };
};

export const clearAddRoomStage = () => {
  localStorage.removeItem("addRoomStage");
  return (dispatch) => {
    dispatch(roomActions.clearStage());
  };
};

export const clearRoom = () => {
  localStorage.removeItem("addRoomStage");
  localStorage.removeItem("newRoom");
  return (dispatch) => {
    dispatch(roomActions.clearRoom());
  };
};
