import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:5000";
} else {
  url = "https://letschat-backend.onrender.com";
}

export { url };
export const authActions = authSlice.actions;
