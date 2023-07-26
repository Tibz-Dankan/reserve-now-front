import { AppDate } from "../../../shared/utils/appDate";

export class Messages {
  messageList;
  organizedMessageList = [];

  constructor(messageList) {
    this.messageList = messageList;
  }

  hasDifferentMinute(prevDate, currentDate) {
    const prevMessageMinutes = new Date(prevDate).getMinutes();
    const currentMessageMinutes = new Date(currentDate).getMinutes();

    if (currentMessageMinutes !== prevMessageMinutes) return true;
    if (currentMessageMinutes === prevMessageMinutes) return false;
  }

  showTime(prevDate, currentDate) {
    return this.hasDifferentMinute(prevDate, currentDate);
  }

  organize() {
    let msgObj = {};
    let prevDay, currentDay;
    let prevDate, currentDate;

    this.messageList.map((messageObj, index) => {
      msgObj = messageObj;
      currentDate = new Date(messageObj.createdAt);
      prevDate = new Date(this.messageList[index - 1]?.createdAt);

      currentDay = new AppDate(currentDate).day();
      prevDay = prevDate && new AppDate(prevDate).day();

      if (currentDay !== prevDay) {
        msgObj.showDay = true;
        msgObj.showTime = this.showTime(prevDate, currentDate);
        this.organizedMessageList.push(msgObj);
      } else {
        msgObj.showDay = false;
        msgObj.showTime = this.showTime(prevDate, currentDate);
        this.organizedMessageList.push(msgObj);
      }
    });
    return this.organizedMessageList;
  }
}
