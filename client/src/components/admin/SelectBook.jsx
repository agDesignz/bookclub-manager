const SelectBook = ({ books, setMeetData, meetData }) => {
  const handleSelectBook = (title, id) =>
    setMeetData({ ...meetData, bookTitle: title, bookId: id });
  return (
    <dialog id="select_book" className="modal">
      <form method="dialog">
        <div className="flex flex-col gap-4 p-4 bg-slate-950 h-full w-full justify-center">
          {books.map((book) => (
            <button
              value={book.id}
              key={book.id}
              className="flex gap-4 lg:gap-8 justify-between items-center btn-outline px-5 py-2 border rounded-lg"
              onClick={() => handleSelectBook(book.title, book.id)}
            >
              <div className="flex flex-col gap-2 lg:gap-4 items-start">
                <h2 className="text-xl">{book.title}</h2>
                <h3 className="text-l">{book.author}</h3>
              </div>
              <figure>
                <img
                  className=""
                  src={`https://covers.openlibrary.org/b/id/${book.cover}-S.jpg`}
                  alt={`Cover image of ${book.title}`}
                />
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
