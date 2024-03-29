import { AppDate } from "../../../shared/utils/appDate";

export class Messages {
  currentUser;
  recipient;

  constructor(currentUserObj, recipientObj) {
    this.currentUser = currentUserObj;
    this.recipient = recipientObj;
  }

  currentUserIsSender(msgObj) {
    if (this.currentUser.id === msgObj.senderId) {
      return {
        currentUserIsSender: true,
        userImageUrl: this.currentUser.imageUrl,
        username: this.currentUser.name,
      };
    }
    return {
      currentUserIsSender: false,
      userImageUrl: this.recipient.imageUrl,
      username: this.recipient.name,
    };
  }

  isPrimaryMessage(currentMessageObj, prevMessageObj) {
    if (currentMessageObj.senderId !== prevMessageObj?.senderId) {
      return {
        isPrimaryMessage: true,
      };
    }
    return {
      isPrimaryMessage: false,
    };
  }

  hasDifferentMinute(prevDate, currentDate) {
    const prevMinutes = new Date(prevDate).getMinutes();
    const currentMinutes = new Date(currentDate).getMinutes();

    if (currentMinutes !== prevMinutes) return true;
    if (currentMinutes === prevMinutes) return false;
  }

  showTime(prevDate, currentDate) {
    return this.hasDifferentMinute(prevDate, currentDate);
  }

  hasDifferentDay(prevDate, currentDate) {
    const prevDay = prevDate && new AppDate(prevDate).day();
    const currentDay = new AppDate(currentDate).day();

    if (currentDay !== prevDay) return true;
    if (currentDay === prevDay) return false;
  }

  showDay(prevDate, currentDate) {
    return this.hasDifferentDay(prevDate, currentDate);
  }

  organize(msgList) {
    const organizedMessageList = [];
    let prevDate, currentDate;
    const messageList = msgList;

    messageList.map((messageObj, index) => {
      const descriptors = Object.getOwnPropertyDescriptors(messageObj); //copy properties
      const msgObj = Object.defineProperties({}, descriptors); //create mutable object with all properties

      currentDate = new Date(messageObj.createdAt);
      prevDate = new Date(messageList[index - 1]?.createdAt);
      const prevMessageObj = messageList[index - 1];

      msgObj.isPrimaryMessage = this.isPrimaryMessage(
        messageObj,
        prevMessageObj
      ).isPrimaryMessage;
      msgObj.showTime = this.showTime(prevDate, currentDate);
      msgObj.showDay = this.showDay(prevDate, currentDate);

      const currentUserIsSender = this.currentUserIsSender(messageObj);
      msgObj.currentUserIsSender = currentUserIsSender.currentUserIsSender;
      msgObj.userImageUrl = currentUserIsSender.userImageUrl;
      msgObj.username = currentUserIsSender.username;

      organizedMessageList.push(msgObj);
    });
    return organizedMessageList;
  }
}
