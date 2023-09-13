export class AppDate {
  currentDate;
  midnight;
  date;
  oneDayMillSec;

  constructor(date) {
    this.currentDate = new Date(Date.now());
    this.midnight = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate()
    );
    this.oneDayMillSec = 1000 * 60 * 60 * 24;
    this.date = new Date(date);
  }

  construct() {
    const candidateDate = this.date;
    const candidateDateMidnight = new Date(
      candidateDate.getFullYear(),
      candidateDate.getMonth(),
      candidateDate.getDate()
    );
    return candidateDateMidnight.toISOString();
  }

  day() {
    const tomorrowEnd = new Date(
      this.midnight.getTime() + 2 * this.oneDayMillSec
    );
    const todayEnd = new Date(this.midnight.getTime() + this.oneDayMillSec);
    const yesterdayEnd = new Date(this.midnight.getTime() - this.oneDayMillSec);
    const date = new Date(this.date.getTime());

    if (date > this.midnight && date < todayEnd) {
      return "Today";
    }
    if (date > this.midnight && date < tomorrowEnd) {
      return "Tomorrow";
    }
    if (date < this.midnight && date > yesterdayEnd) {
      return "Yesterday";
    }
    if (date < yesterdayEnd) {
      return date.toDateString(); // provides format  -> Sun Jul 03 2022;
    }
  }

  time() {
    const date = new Date(this.date.getTime());
    //provides format  -> 3:47 AM
    return date.toLocaleTimeString("en-Us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}
