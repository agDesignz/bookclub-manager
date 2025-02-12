const updateObjectDate = (obj) => {
  if (!obj.date) return "No Object Date";

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the date string

    // Extract UTC components
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");

    // Return in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  };

  obj.date = formatDate(obj.date);
  return obj;
};

export default updateObjectDate;
