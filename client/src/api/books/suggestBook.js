const suggestBook = async (
  user,
  bookTitle,
  bookAuthor,
  bookCover,
  bookDescription,
  bookKey
) => {
  const data = {
    user,
    bookTitle,
    bookAuthor: bookAuthor[0],
    bookCover,
    bookDescription,
    bookKey,
  };

  try {
    const query = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify(data),
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

    const result = await query.json();
    return result;
  } catch (error) {
    console.error("Error during fetch:", error.message);
    throw error;
  }
};

export default suggestBook;
