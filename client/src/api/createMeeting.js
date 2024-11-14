import updateObjectDate from "../utils/formatDate";

const createMeeting = async (input) => {
  const { date, time, location, bookId: book_id } = input;
  try {
    const query = await fetch("/api/meeting", {
      method: "POST",
      body: JSON.stringify({ date, time, location, book_id }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!query.ok) {
      // Throw an error for non-200 status codes
      const errorData = await query.json();
      throw new Error(errorData.error);
    }
    const response = await query.json();
    const result = updateObjectDate(response);
    return result;
  } catch (error) {
    console.log("error during fetch:", error);
    throw error;
  }
};

export default createMeeting;
