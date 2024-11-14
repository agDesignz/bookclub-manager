const updateObjectDate = (obj) => {
  if (!obj.date) return "No Object Date";
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get the individual components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Return in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  };
  obj.date = formatDate(obj.date);
  return obj;
};

export default updateObjectDate;
