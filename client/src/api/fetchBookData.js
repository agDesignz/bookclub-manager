const fetchBookData = async (title, author, page) => {
  try {
    const query = await fetch(
      `https://openlibrary.org/search.json?${title && `title=${title}`
      }&${author && `author=${author}`}&limit=10&page=${page}`,
      {
        method: "GET",
      }
    );
    if (query.ok) {
      const payload = await query.json();
      const filteredBooks = payload.docs.filter(
        (book) => book.title && book.author_name
      );

      return filteredBooks;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchBookData