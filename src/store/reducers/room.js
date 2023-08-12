import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  addRoomStage: 1,
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
      state.addRoomStage = null;
    },
  },
});
