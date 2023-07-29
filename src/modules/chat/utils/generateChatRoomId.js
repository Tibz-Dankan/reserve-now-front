export const generateChatRoomId = (currentUserId, recipientId) => {
  const areParametersNumbers =
    Number.isInteger(currentUserId) && Number.isInteger(recipientId);
  if (areParametersNumbers === false) return;
  if (currentUserId > recipientId) {
    return "ctRib#td@rsn" + recipientId + "&" + currentUserId + "#cvsn";
  } else {
    return "ctRib#td@rsn" + currentUserId + "&" + recipientId + "#cvsn";
  }
};
