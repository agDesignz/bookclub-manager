import { useState } from "react";
import DescriptionModal from "./DescriptionModal";

const BookCard = ({ book, user, removeBook, handleVote, handleVoteDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const hasVoted = book.voters.some((voter) => voter.username === user);

  const handleDeleteBook = () => {
    setIsDeleting(true);
    setTimeout(() => {
      removeBook();
      setIsDeleting(false);
    }, 500);
  };

  return (
    <div
      className={`grid md:grid-cols-2 gap-4 rounded-sm p-4 text-blue-950 shadow-xl transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#fde68a]  to-[#ffbb46] ${
        isDeleting ? "opacity-0" : "opacity-100"
      }`}
    >
      <figure className="md:block">
        <img
          className="shadow-lg m-auto"
          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
          alt={`Cover image of ${book.title}`}
        />
      </figure>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h2 className="card-title uppercase">{book.title}</h2>
          <p>{book.author}</p>
          <DescriptionModal
            bookDescription={book.description}
            modalId={`modal_${book.id}`}
          />
          <p className="italic text-amber-700">
            Recommended by {user === book.user_ref ? "you" : book.user_ref}
          </p>
          <div className="badge badge-success badge-outline badge-lg">
            Votes: {book.voters.length}
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-between">
          {user === book.user_ref ? (
            <button
              className="btn btn-outline btn-error"
              onClick={handleDeleteBook}
            >
              Delete
            </button>
          ) : hasVoted ? (
            <button
              className="btn btn-outline btn-error"
              onClick={handleVoteDelete}
            >
              Remove your vote
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleVote}>
              Vote for this book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookCard;
