const getBooks = async () => {
  try {
    const query = await fetch('api/book');
    console.log("getBooks query:", query)
    if (query.ok) {
      const bookData = await query.json();
      console.log("fetchBooks bookData:", bookData);
      return bookData;
    }
  } catch (error) {
    return error;
  }
}

export default getBooks