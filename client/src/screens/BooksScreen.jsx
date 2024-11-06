import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import deleteBook from "../api/deleteBook";
import getBooks from "../api/getBooks";
import BookCard from "../components/BookCard";
import castVote from "../api/castVote";

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const { userData } = useAuth();

  const fetchSavedBooks = async () => {
    const bookData = await getBooks();
    setBooks(bookData);
  };

  const removeBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((bk) => bk.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async (bk) => {
    try {
      await castVote(userData.id, bk);
      console.log("vote cast");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSavedBooks();
  }, []);
  useEffect(() => {
    console.log("books:", books);
  }, [books]);

  return (
    <div className="mx-auto h-full container m-4">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            user={userData.username}
            removeBook={() => removeBook(book.id)}
            handleVote={() => handleVote(book.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default BooksScreen;
