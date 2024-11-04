import { useState } from "react";
import BookModal from "./BookModal";
import fetchBookDescription from "../api/fetchBookDescription";

const SearchResults = ({ searchResults, handlePageChange, page }) => {
  const [modalData, setModalData] = useState({});
  const { books, numFound } = searchResults;

  const resetData = () => {
    setModalData({});
  };

  const getBook = async (idx, bookTitle, bookAuthor, bookCover, bookKey) => {
    const bookDescription = await fetchBookDescription(bookKey);
    setModalData({
      idx,
      bookTitle,
      bookAuthor,
      bookCover,
      bookDescription,
      bookKey,
    });
    document.getElementById("book_modal").showModal();
  };

  return (
    <>
      {books.map((book, idx) => (
        <button
          className="btn-outline px-5 py-2 border rounded-lg"
          key={idx}
          onClick={() =>
            getBook(idx, book.title, book.author_name, book.cover_i, book.key)
          }
        >
          <h2 className="text-xl">{book.title}</h2>
          {book.author_name &&
            book.author_name.map((auth, i) => (
              <h3 className="text-l" key={i}>
                {auth}
              </h3>
            ))}
        </button>
      ))}
      <div className="flex justify-between mt-4 mb-16">
        <button
          className="btn btn-outline"
          disabled={page === 1} // Disable "Previous" button on the first page
          onClick={() => handlePageChange(page - 1)}
        >
          Previous 10
        </button>

        <button
          className="btn btn-outline"
          disabled={page * 10 > numFound}
          onClick={() => handlePageChange(page + 1)}
        >
          Next 10
        </button>
      </div>
      <BookModal modalData={modalData} resetData={resetData} />
    </>
  );
};
export default SearchResults;
