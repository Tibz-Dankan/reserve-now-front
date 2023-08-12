import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  addRoomStage: 1,
  newRoom: {},
};
export const roomSlice = createSlice({
  name: "room",
  initialState: theInitialState,
  reducers: {
    updateAddRoomStage(state, action) {
      state.addRoomStage = action.payload.addRoomStage;
      return;
    },
    clearStage(state) {
      state.addRoomStage = 1;
    },
    updateNewRoom(state, action) {
      state.addRoomStage = action.payload.newRoom;
      return;
    },
    clearRoom(state) {
      state.addRoomStage = 1;
      state.addRoomStage = {};
    },
  },
});
