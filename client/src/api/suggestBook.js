
const suggestBook = async (user, bookTitle, bookAuthor, bookCover) => {
  const data = { user, bookTitle, bookAuthor: bookAuthor[0], bookCover };

  try {
    const query = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include"
    });

    if (!query.ok) {
      // Throw an error for non-200 status codes
      const errorData = await query.json();
      console.log("Our Error:", errorData);
      throw new Error(errorData.error);
    }

    const result = await query.json();
    console.log("query from function", result);
    return result;

  } catch (error) {
    console.error('Error during fetch:', error.message);
    throw error;
  }
};

export default suggestBook;