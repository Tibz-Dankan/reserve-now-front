import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000";
} else {
  url = "some production url";
}

export { url };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
