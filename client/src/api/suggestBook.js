
const suggestBook = async (user, bookTitle, bookAuthor, bookCover) => {
  const data = { user, bookTitle, bookAuthor: bookAuthor[0], bookCover }
  console.log("data", data);
  try {
    const query = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include"
    });
    console.log("query:---", query);
    if (query.ok) {
      const result = await query.json();
      console.log("query from function", result);
    }
  } catch (error) {
    console.log(error)
  }
}

export default suggestBook;