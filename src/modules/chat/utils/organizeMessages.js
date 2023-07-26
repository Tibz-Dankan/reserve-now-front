import { AppDate } from "../../../shared/utils/appDate";

export class Messages {
  hasDifferentMinute(prevDate, currentDate) {
    const prevMessageMinutes = new Date(prevDate).getMinutes();
    const currentMessageMinutes = new Date(currentDate).getMinutes();

    if (currentMessageMinutes !== prevMessageMinutes) return true;
    if (currentMessageMinutes === prevMessageMinutes) return false;
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
    let msgObj = {};
    let prevDate, currentDate;
    const messageList = msgList;

    messageList.map((messageObj, index) => {
      msgObj = messageObj;
      currentDate = new Date(messageObj.createdAt);
      prevDate = new Date(this.messageList[index - 1]?.createdAt);

      msgObj.showTime = this.showTime(prevDate, currentDate);
      msgObj.showDay = this.showDay(prevDate, currentDate);
      organizedMessageList.push(msgObj);
    });
    return organizedMessageList;
  }
}
