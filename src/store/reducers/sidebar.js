import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {
    openSidebar(state, _) {
      state.isOpen = true;
    },
    closeSidebar(state, _) {
      state.isOpen = false;
    },
  },
});
