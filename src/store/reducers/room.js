import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  addRoomStage: 1,
  newRoom: {},
  editRoom: {},
  deleteRoom: {},
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
      state.newRoom = action.payload.newRoom;
      return;
    },
    updateEditRoom(state, action) {
      state.editRoom = action.payload.editRoom;
      return;
    },
    updateDeleteRoom(state, action) {
      state.deleteRoom = action.payload.deleteRoom;
      return;
    },
    clearRoom(state) {
      state.addRoomStage = 1;
      state.newRoom = {};
      state.editRoom = {};
      state.deleteRoom = {};
    },
  },
});
