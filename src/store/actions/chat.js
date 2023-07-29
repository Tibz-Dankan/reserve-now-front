import { chatActions } from "../index";

export const updateChatRecipientList = (chatRecipientList) => {
  return (dispatch) => {
    dispatch(
      chatActions.updateChatRecipientList({
        chatRecipientList: chatRecipientList,
      })
    );
  };
};

export const updateCurrentRecipient = (currentRecipient) => {
  return (dispatch) => {
    dispatch(
      chatActions.updateCurrentRecipient({
        currentRecipient: currentRecipient,
      })
    );
  };
};

export const addToThreadList = (recipient) => {
  return (dispatch) => {
    dispatch(
      chatActions.addToThreadList({
        recipient: recipient,
      })
    );
  };
};

export const updateMessageList = (messageList) => {
  return (dispatch) => {
    dispatch(
      chatActions.updateMessageList({
        messageList: messageList,
      })
    );
  };
};

export const addToMessageList = (message) => {
  return (dispatch) => {
    dispatch(
      chatActions.addToMessageList({
        message: message,
      })
    );
  };
};
