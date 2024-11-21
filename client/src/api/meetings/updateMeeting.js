import updateObjectDate from "../../utils/formatDate";

const updateMeeting = async (input) => {
  const { id, date, time, location, bookId: book_id } = input;
  try {
    const query = await fetch("/api/meeting", {
      method: "PUT",
      body: JSON.stringify({ id, date, time, location, book_id }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!query.ok) {
      const errorData = await query.json();
      throw new Error(errorData.error);
    }
    const response = await query.json();
    const result = updateObjectDate(response);
    console.log("result:", result);
    return result;
  } catch (error) {
    console.log("error during fetch:", error);
    throw error;
  }
};

export default updateMeeting;
