import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";
import { sidebarSlice } from "./reducers/sidebar";
import { chatSlice } from "./reducers/chat";
import { roomSlice } from "./reducers/room";
import { bookingSlice } from "./reducers/booking";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    sidebar: sidebarSlice.reducer,
    chat: chatSlice.reducer,
    room: roomSlice.reducer,
    booking: bookingSlice.reducer,
  },
});

let url, socketUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
  socketUrl = "http://localhost:8000";
} else {
  url = "https://reserve-now-backend.onrender.com/api/v1";
  socketUrl = "https://reserve-now-backend.onrender.com";
}

export { url, socketUrl };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const chatActions = chatSlice.actions;
export const roomActions = roomSlice.actions;
export const bookingActions = bookingSlice.actions;
