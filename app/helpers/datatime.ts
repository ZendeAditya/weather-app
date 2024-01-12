const getCurrentDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  let hours = currentDate.getHours();
  const amPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const currentDateTime = {
    date: `${day}-${month}-${year}`,
    time: `${hours}:${minutes}:${seconds} ${amPM}`,
    day: dayOfWeek,
  };

  return currentDateTime;
};

export default getCurrentDateTime;

export function getSunriseTime(timestamp: number) {
  // Convert Unix timestamp to milliseconds
  const sunriseTimeInMillis = timestamp * 1000;

  // Create a new Date object with the timestamp
  const sunriseDate = new Date(sunriseTimeInMillis);

  // Get hours, minutes, and seconds
  const hours = sunriseDate.getHours().toString().padStart(2, "0");
  const minutes = sunriseDate.getMinutes().toString().padStart(2, "0");
  const seconds = sunriseDate.getSeconds().toString().padStart(2, "0");

  // Format the time string
  const sunriseTimeString = `${hours}:${minutes}:${seconds}`;

  return sunriseTimeString;
}

export function getSunsetTime(timestamp: number) {
  // Convert Unix timestamp to milliseconds
  const sunsetTimeInMillis = timestamp * 1000;

  // Create a new Date object with the timestamp
  const sunsetDate = new Date(sunsetTimeInMillis);

  // Get hours, minutes, and seconds
  const hours = sunsetDate.getHours().toString().padStart(2, "0");
  const minutes = sunsetDate.getMinutes().toString().padStart(2, "0");
  const seconds = sunsetDate.getSeconds().toString().padStart(2, "0");
  const sunsetTimeString = `${hours}:${minutes}:${seconds}`;

  return sunsetTimeString;
}

