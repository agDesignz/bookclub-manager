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
      className={`rounded-lg p-4 shadow-xl transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600  to-amber-800 text-slate-100 ${
        isDeleting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <DescriptionModal
          bookCover={book.cover}
          bookTitle={book.title}
          bookDescription={book.description}
          modalId={`modal_${book.id}`}
        />
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h2 className="card-title uppercase">{book.title}</h2>
            <p>{book.author}</p>
            <p className="badge badge-lg italic border-indigo-200 bg-indigo-200 text-amber-800 shadow-lg">
              Recommended by {user === book.user_ref ? "you" : book.user_ref}
            </p>
            <div className="badge badge-success badge-lg shadow-lg">
              Votes: {book.voters.length}
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between">
            {user === book.user_ref ? (
              <button
                className="btn btn-error shadow-lg"
                onClick={handleDeleteBook}
              >
                Delete
              </button>
            ) : hasVoted ? (
              <button
                className="btn btn-outline btn-error shadow-lg"
                onClick={handleVoteDelete}
              >
                Remove your vote
              </button>
            ) : (
              <button
                className="btn btn-success shadow-lg"
                onClick={handleVote}
              >
                Vote for this book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
