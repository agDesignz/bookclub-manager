const SelectBook = ({ books, setMeetData, meetData }) => {
  const handleSelectBook = (title, id) =>
    setMeetData({ ...meetData, bookTitle: title, bookId: id });
  return (
    <dialog id="select_book" className="modal overflow-y-auto">
      <form method="dialog">
        <div className="flex flex-col gap-4 p-4 bg-slate-950 h-full w-full justify-center overflow-auto">
          {books.map((book) => (
            <button
              value={book.id}
              key={book.id}
              className="grid grid-cols-[1fr_max-content] gap-4 btn-outline px-5 py-2 border rounded-lg"
              onClick={() => handleSelectBook(book.title, book.id)}
            >
              <div className="flex flex-col gap-2 lg:gap-4 items-start text-left">
                <h2 className="text-xl">{book.title}</h2>
                <h3 className="text-md italic">- {book.author}</h3>
              </div>
              <figure className="flex flex-col gap-2 items-center">
                <img
                  className=""
                  src={`https://covers.openlibrary.org/b/id/${book.cover}-S.jpg`}
                  alt={`Cover image of ${book.title}`}
                />
                <figcaption>Votes: {book.voters.length}</figcaption>
              </figure>
            </button>
          ))}

          <button
            method="dialog"
            className="flex gap-4 lg:gap-8 justify-center items-center btn-outline px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default SelectBook;
