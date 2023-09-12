import { createSlice } from "@reduxjs/toolkit";

const theInitialState = {
  bookingStage: 1,
  newBooking: {},
};
export const bookingSlice = createSlice({
  name: "booking",
  initialState: theInitialState,
  reducers: {
    updateBookingStage(state, action) {
      state.bookingStage = action.payload.bookingStage;
      return;
    },
    updateNewBooking(state, action) {
      state.newBooking = action.payload.newBooking;
      return;
    },
    clearStage(state) {
      state.bookingStage = 1;
    },
    clearBooking(state) {
      state.bookingStage = 1;
      state.newBooking = {};
    },
  },
});
