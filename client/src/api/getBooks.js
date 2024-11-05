const getBooks = async () => {
  try {
    const query = await fetch("api/book");
    if (query.ok) {
      const bookData = await query.json();
      return bookData;
    }
  } catch (error) {
    return error;
  }
};

export default getBooks;
