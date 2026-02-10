const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const getDate = () => {
  const month = monthNames[new Date().getMonth()];
  const day = new Date().getDate().toLocaleString();
  const hour = new Date().getHours().toLocaleString().padStart(2, "0");
  const minutes = new Date().getMinutes().toLocaleString().padStart(2, "0");
  return `${month} ${day}st ${hour}:${minutes}`;
};
