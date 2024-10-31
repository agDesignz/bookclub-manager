const BookModal = ({ modalData, resetData }) => {
  const { idx, bookTitle, bookAuthor, bookCover } = modalData;

  return (
    <>
      <dialog id="book_modal" className="modal">
        <div className="modal-box bg-amber-50 text-blue-950 px-14 py-10">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={resetData}
            >
              ✕
            </button>
          </form>

          <div className="flex flex-col md:flex-row gap-10 justify-between">
            <img
              className="max-w-44"
              src={`https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`}
              alt={`Cover image of ${bookTitle}`}
            />
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-3xl">{bookTitle}</h3>
                {bookAuthor &&
                  bookAuthor.map((auth, i) => (
                    <p className="text-xl" key={i}>
                      {auth}
                    </p>
                  ))}
              </div>
              <button className="btn btn-accent">Suggest Book</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default BookModal;
