import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";
import { sidebarSlice } from "./reducers/sidebar";
import { chatSlice } from "./reducers/chat";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    sidebar: sidebarSlice.reducer,
    chat: chatSlice.reducer,
  },
});

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
} else {
  url = "some production url/api/v1";
}

export { url };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const chatActions = chatSlice.actions;
