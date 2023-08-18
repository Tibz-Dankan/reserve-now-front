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
      console.log("action.payload.addRoomStage");
      console.log(action.payload.addRoomStage);
      state.addRoomStage = action.payload.addRoomStage;
      return;
    },
    clearStage(state) {
      state.addRoomStage = 1;
    },
    updateNewRoom(state, action) {
      console.log("action.payload.newRoom");
      console.log(action.payload.newRoom);
      state.addRoomStage = action.payload.newRoom;
      return;
    },
    clearRoom(state) {
      state.addRoomStage = 1;
      state.addRoomStage = {};
    },
  },
});
