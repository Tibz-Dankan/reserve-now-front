import { AppDate } from "./appDate";

const oneDayMillSec = 1000 * 60 * 60 * 24;
const oneWeekMillSec = 1000 * 60 * 60 * 24 * 7;
const oneMonthMillSec = 1000 * 60 * 60 * 24 * 30;
const oneYearMillSec = 1000 * 60 * 60 * 24 * 365;

const days = (millSecs) => {
  const dys = millSecs / oneDayMillSec;
  return Math.floor(dys);
};

const weeks = (millSecs) => {
  const wks = millSecs / oneWeekMillSec;
  return Math.floor(wks);
};

const months = (millSecs) => {
  const mths = millSecs / oneMonthMillSec;
  return Math.floor(mths);
};

const years = (millSecs) => {
  const yrs = millSecs / oneYearMillSec;
  return Math.floor(yrs);
};

export const timeToCome = (dateStr) => {
  const candidateDateMillSec = new Date(dateStr).getTime();
  const currentDateString = new AppDate(new Date()).construct();
  const currentDateMillSec = new Date(currentDateString).getTime();

  const millSecDiff = candidateDateMillSec - currentDateMillSec;

  if (currentDateMillSec > candidateDateMillSec) {
    return "past day(s)";
  }

  if (millSecDiff < oneWeekMillSec) {
    if (days(millSecDiff) === 1) {
      return new AppDate(dateStr).day();
    }
    return `in ${days(millSecDiff)} days `;
  }

  if (millSecDiff < oneMonthMillSec) {
    if (weeks(millSecDiff) === 1) return "in a week";
    return `in ${weeks(millSecDiff)} weeks`;
  }

  if (millSecDiff < oneYearMillSec) {
    if (months(millSecDiff) === 1) return "in a month";
    return `in ${months(millSecDiff)} months`;
  }

  if (millSecDiff >= oneYearMillSec) {
    if (years(millSecDiff) === 1) return "in a year ";
    return `in ${years(millSecDiff)} years`;
  }
};
