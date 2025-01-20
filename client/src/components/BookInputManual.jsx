import { useState } from "react";
import suggestBook from "../api/books/suggestBook";

const BookInputManual = ({ username, clearInput }) => {
  const [input, setInput] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [successState, setSucessState] = useState(false);

  const closeModalHandler = () => {
    setInput({});
    setSucessState(false);
    clearInput();
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

    console.log(input);
  };

  const submitInput = async (e) => {
    e.preventDefault();
    if (input.bookTitle.length > 200) {
      setErrorMessage("Title is too long");
      return;
    }
    if (input.bookAuthor.length > 50) {
      setErrorMessage("Author name is too long");
      return;
    }
    const { bookTitle, bookAuthor } = input;
    console.log("username", username);
    console.log("bookTitle", bookTitle);
    console.log("bookAuthor", bookAuthor);
    try {
      const suggestionReply = await suggestBook(username, bookTitle, [
        bookAuthor,
      ]);
      console.log("suggestionReply:", suggestionReply);
      setSucessState(true);
    } catch (error) {
      console.error("Error during fetch:", error.message);
      throw error;
    }
    console.log("Form Submitted");
  };

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => document.getElementById("manual-input").showModal()}
      >
        Enter Book Manually
      </button>
      <dialog id="manual-input" className="modal">
        <div className="h-screen md:h-auto w-screen md:w-[600px] modal-box flex flex-col gap-4 justify-center max-h-screen max-w-full rounded-none md:rounded-lg">
          {successState ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <h3 className="text-2xl text-green-400">
                Your suggestion has been sent
              </h3>
            </div>
          ) : (
            <form className="flex flex-col gap-4">
              <input
                type="text"
                name="bookTitle"
                value={input?.bookTitle || ""}
                placeholder="Title"
                onChange={handleInputChange}
                className="border rounded-lg py-3 px-3 bg-transparent placeholder-white-500 text-white w-full"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="bookAuthor"
                  value={input?.bookAuthor || ""}
                  placeholder="Author"
                  onChange={handleInputChange}
                  className="border rounded-lg py-3 px-3 bg-transparent  placeholder-white-500 text-white w-full"
                />

                <button
                  className="btn btn-full btn-outline"
                  onClick={submitInput}
                >
                  Suggest Book
                </button>
              </div>

              <p className="text-red-500">{errorMessage}</p>
            </form>
          )}
          <form method="dialog" className="self-center">
            <button
              className={`btn btn-sm btn-outline ${
                !successState && "btn-error"
              }`}
              onClick={closeModalHandler}
            >
              {successState ? "Close" : "Cancel"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};
export default BookInputManual;
