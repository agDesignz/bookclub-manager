import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import deleteBook from "../api/books/deleteBook";
import getBooks from "../api/books/getBooks";
import BookCard from "../components/BookCard";
import castVote from "../api/votes/castVote";
import deleteVote from "../api/votes/deleteVote";

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
      setBooks(
        books.map((b) =>
          b.id === bk
            ? { ...b, voters: [...b.voters, { username: userData.username }] }
            : b
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoteDelete = async (bk) => {
    try {
      await deleteVote(userData.id, bk);
      setBooks(
        books.map((b) =>
          b.id === bk
            ? {
                ...b,
                voters: b.voters.filter(
                  (voter) => voter.username !== userData.username
                ),
              }
            : b
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSavedBooks();
  }, []);

  // useEffect(() => {
  //   console.log("books:", books);
  // }, [books]);

  return (
    <div className="mx-auto h-full m-4">
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            user={userData.username}
            removeBook={() => removeBook(book.id)}
            handleVote={() => handleVote(book.id)}
            handleVoteDelete={() => handleVoteDelete(book.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default BooksScreen;
