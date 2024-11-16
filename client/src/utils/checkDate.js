const checkDate = (date) => {
  // Parse the input date
  const inputDate = new Date(date);

  // Check if the input is a valid date
  if (isNaN(inputDate.getTime())) {
    return "Invalid date";
  }

  // Normalize input date to local date (midnight)
  inputDate.setHours(0, 0, 0, 0);

  // Get today's date without the time portion (to compare dates accurately)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if the input date is before today
  if (inputDate < today) {
    return "Date is before today's date";
  }

  return "valid";
};

export default checkDate;
