import { useState } from "react";

const BookModal = ({ modalData, resetData }) => {
  const { idx, bookTitle, bookAuthor, bookCover } = modalData;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoaded = () => {
    setIsLoading(false); // Hide loading spinner when the image is loaded
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true); // Handle if there's an error loading the image
  };

  return (
    <>
      <dialog id="book_modal" className="modal">
        <div className="modal-box bg-amber-50 text-blue-950 px-14 py-10">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={resetData}
            >
              ✕
            </button>
          </form>

          <div className="flex flex-col md:flex-row gap-10 justify-between">
            <div className="book-cover">
              {isLoading && !hasError && (
                <div className="loading-spinner">
                  <span className="loading loading-bars loading-md"></span>
                </div>
              )}

              {hasError ? (
                <p>Image not available</p>
              ) : (
                <img
                  className="max-w-44"
                  src={`https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`}
                  alt={`Cover image of ${bookTitle}`}
                  onLoad={handleImageLoaded}
                  onError={handleImageError}
                  style={{ display: isLoading ? "none" : "block" }}
                />
              )}
            </div>
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
