const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let meridiem = hour > 11 ? "PM" : "AM";

  let outTime =
    (hour === 0 ? 12 : hour % 12) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    meridiem;

  return outTime;
}

export function convertDate(timecode) {
  const date = new Date(parseInt(timecode) * 1000);

  const time = formatTime(date);

  const convertedDate =
    days[date.getDay()] +
    " " +
    months[date.getMonth()] +
    " " +
    date.getDate() +
    " " +
    time;

  return convertedDate;
}

export function convertDateShort(timecode) {
  const date = new Date(parseInt(timecode) * 1000);

  const convertedDate = daysShort[date.getDay()] + " " + date.getDate();

  return convertedDate;
}
