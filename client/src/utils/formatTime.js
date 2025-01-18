function formatTime(time) {
  const time24 = time;

  if (!/^\d{2}:\d{2}:\d{2}$/.test(time24)) {
    return time;
  }

  const [hours, minutes] = time24.split(":").map(Number); // Extract hours and minutes as numbers
  const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
  const hours12 = hours % 12 || 12; // Convert 24-hour to 12-hour format, handling midnight and noon
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`; // Format with leading zero for minutes
}

export default formatTime;
