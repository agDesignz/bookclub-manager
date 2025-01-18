const getBooks = async () => {
  try {
    const query = await fetch("api/book");
    if (query.ok) {
      const freshData = await query.json();
      const bookData = freshData.sort((a, b) => {
        if (a.voters.length < b.voters.length) {
          return 1;
        } else if (a.voters.length > b.voters.length) {
          return -1;
        } else {
          return 0;
        }
      });
      return bookData;
    }
  } catch (error) {
    return error;
  }
};

export default getBooks;
