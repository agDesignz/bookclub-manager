import { useState } from "react";
import suggestBook from "../api/books/suggestBook";
import { useAuth } from "../context/AuthContext";
import Alert from "./Alert";
import Success from "./Success";

const BookModal = ({ modalData, resetData, username }) => {
  const { idx, bookTitle, bookAuthor, bookCover, bookDescription, bookKey } =
    modalData;
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSuggestBtn, setShowSuggestBtn] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false); // Hide loading spinner when the image is loaded
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true); // Handle if there's an error loading the image
  };

  const handleSuggest = async () => {
    setShowSuggestBtn(false);
    try {
      const suggestionReply = await suggestBook(
        username,
        bookTitle,
        bookAuthor,
        bookCover,
        bookDescription,
        bookKey
      );
      console.log("suggestionReply", suggestionReply);
      // Handle success logic
      setSuccess(true);
      setErrorMessage(null); // Clear the error message on success
    } catch (error) {
      // If an error is thrown, it will be caught here
      console.error("Error during suggestion:", error.message);

      // Display the error message on the screen (e.g., set a state variable)
      setErrorMessage(error.message);
    }
  };

  const closeModalHandler = () => {
    setErrorMessage(null);
    setSuccess(false);
    setShowSuggestBtn(true);
    resetData();
  };

  return (
    <>
      <dialog id="book_modal" className="modal">
        <div className="modal-box bg-amber-50 text-blue-950 lg:px-14 lg:py-10 max-w-4xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModalHandler}
            >
              ✕
            </button>
          </form>

          <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
            <div className="book-cover">
              {isLoading && !hasError && (
                <span className="loading loading-bars loading-md"></span>
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
            <div className="flex flex-col gap-4 justify-between">
              <div>
                <h3 className="font-bold text-3xl">{bookTitle}</h3>
                {bookAuthor &&
                  bookAuthor.map((auth, i) => (
                    <p className="text-xl" key={i}>
                      {auth}
                    </p>
                  ))}
              </div>
              <p>{bookDescription}</p>
              {showSuggestBtn ? (
                <button
                  className="btn btn-accent"
                  onClick={() => handleSuggest(userData.username)}
                >
                  Suggest Book
                </button>
              ) : success ? (
                <Success content={"Book Suggestion Sent"} />
              ) : (
                (errorMessage && <Alert content={errorMessage} />) || (
                  <p>Somethong's off; please try again</p>
                )
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default BookModal;
