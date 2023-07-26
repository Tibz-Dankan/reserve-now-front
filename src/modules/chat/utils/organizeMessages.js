import { AppDate } from "../../../shared/utils/appDate";

export class Messages {
  messageList;
  organizedMessageList = [];

  constructor(messageList) {
    this.messageList = messageList;
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
        msgObj.day = currentDay;
        this.organizedMessageList.push(msgObj);
      } else {
        this.organizedMessageList.push(msgObj);
      }
    });
    return this.organizedMessageList;
  }
}
