import { useEffect, useState } from "react";
import getBooks from "../api/getBooks";
import DescriptionModal from "../components/DescriptionModal";

const BooksScreen = () => {
  const [books, setBooks] = useState([]);

  const fetchSavedBooks = async () => {
    const bookData = await getBooks();
    console.log("fetchSavedBooks:", bookData);
    setBooks(bookData);
  };
  useEffect(() => {
    fetchSavedBooks();
  }, []);
  return (
    <div className="mx-auto h-full container m-4">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-2 rounded-lg p-4 bg-indigo-100 text-blue-950 shadow-xl"
          >
            <figure>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
                alt={`Cover image of ${book.title}`}
              />
            </figure>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="card-title">{book.title}</h2>
                <p>{book.author}</p>
                <p>Recommended by {book.user_ref}</p>
              </div>
              <DescriptionModal
                bookDescription={book.description}
                modalId={`modal_${idx}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BooksScreen;
