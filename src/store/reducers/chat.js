import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatRecipientList: [],
  currentRecipient: {},
  threadList: [],
  messageList: [],
};
export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    updateChatRecipientList(state, action) {
      state.chatRecipientList = action.payload.chatRecipientList;
    },
    updateCurrentRecipient(state, action) {
      state.currentRecipient = action.payload.currentRecipient;
    },
    addToThreadList(state, action) {
      state.threadList = state.threadList.push(action.payload.recipient);
    },
    updateMessageList(state, action) {
      state.messageList = action.payload.messageList;
    },
    addToMessageList(state, action) {
      state.messageList = [...state.messageList, action.payload.message];
    },
    clearChat(state, _) {
      state.chatRecipientList = [];
      state.currentRecipient = {};
      state.threadList = [];
      state.messageList = [];
    },
  },
});
