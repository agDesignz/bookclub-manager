import DescriptionModal from "./DescriptionModal";

const BookCard = ({ book, idx }) => {
  return (
    <div
      key={idx}
      className="grid grid-cols-2 gap-4 rounded-sm p-4 bg-indigo-100 text-blue-950 shadow-xl"
    >
      <figure>
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`}
          alt={`Cover image of ${book.title}`}
        />
      </figure>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <h2 className="card-title">{book.title}</h2>
          <p>{book.author}</p>
          <p>Recommended by {book.user_ref}</p>
          <DescriptionModal
            bookDescription={book.description}
            modalId={`modal_${idx}`}
          />
        </div>
      </div>
    </div>
  );
};
export default BookCard;
