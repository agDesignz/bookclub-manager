import { useState } from "react";
import DescriptionModal from "./DescriptionModal";

const BookCard = ({ book, user, removeBook, handleVote }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBook = () => {
    setIsDeleting(true);
    setTimeout(() => {
      removeBook();
      setIsDeleting(true);
    }, 500);
  };

  return (
    <div
      className={`grid grid-cols-2 gap-4 rounded-sm p-4 bg-amber-50 text-blue-900 shadow-xl transition-opacity duration-500 ${
        isDeleting ? "opacity-0" : "opacity-100"
      }`}
    >
      <figure>
        <img
          className="h-full"
          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
          alt={`Cover image of ${book.title}`}
        />
      </figure>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="card-title">{book.title}</h2>
          <p>{book.author}</p>
          <p className="italic text-amber-700">
            Recommended by {user === book.user_ref ? "you" : book.user_ref}
          </p>
          <div className="badge badge-success badge-outline badge-lg">
            Votes: {book.voters.length}
          </div>
          <DescriptionModal
            bookDescription={book.description}
            modalId={`modal_${book.id}`}
          />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          {user === book.user_ref ? (
            <button
              className="btn btn-outline btn-error"
              onClick={handleDeleteBook}
            >
              Delete
            </button>
          ) : (
            <button
              className="btn btn-outline btn-success"
              onClick={handleVote}
            >
              Vote for this book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookCard;
