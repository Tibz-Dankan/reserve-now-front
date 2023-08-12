import { roomActions } from "../index";

export const updateAddRoomStage = (nextStage) => {
  return (dispatch) => {
    dispatch(roomActions.updateAddRoomStage({ addRoomStage: nextStage }));
  };
};

export const updateNewRoom = (newRoomObj) => {
  return (dispatch) => {
    dispatch(roomActions.updateNewRoom({ newRom: newRoomObj }));
  };
};

export const clearAddRoomStage = () => {
  return (dispatch) => {
    dispatch(roomActions.clearStage());
  };
};
