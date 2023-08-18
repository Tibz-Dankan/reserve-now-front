import { roomActions } from "../index";

export const updateAddRoomStage = (nextStage) => {
  console.log("Room  next stage");
  console.log(nextStage);
  return (dispatch) => {
    dispatch(roomActions.updateAddRoomStage({ addRoomStage: nextStage }));
  };
};

export const updateNewRoom = (newRoomObj) => {
  console.log("newRoomObj");
  console.log(newRoomObj);
  return (dispatch) => {
    dispatch(roomActions.updateNewRoom({ newRom: newRoomObj }));
  };
};

export const clearAddRoomStage = () => {
  return (dispatch) => {
    dispatch(roomActions.clearStage());
  };
};
