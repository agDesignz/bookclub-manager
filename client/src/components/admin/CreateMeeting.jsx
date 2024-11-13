import { useEffect, useState } from "react";
import getBooks from "../../api/getBooks";
import SelectBook from "./SelectBook";

const CreateMeeting = ({ nextMeet }) => {
  const [bookLoading, setBookLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [meetData, setMeetData] = useState({});

  const handleMeetChange = (e) => {
    setMeetData({ ...meetData, [e.target.name]: e.target.value });
  };

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response);
    setBookLoading(false);
  };

  const handleSelectBook = (e) => {
    e.preventDefault();
    document.getElementById("select_book").showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(meetData);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <h2>Next Meeting</h2>
        <label hidden htmlFor="email">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={meetData?.location || ""}
          placeholder="Location"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleMeetChange}
        />
        <label hidden htmlFor="username">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={meetData?.date || ""}
          placeholder="Date"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleMeetChange}
        />
        <label hidden htmlFor="password">
          Time
        </label>
        <input
          type="time"
          name="time"
          value={meetData?.time || ""}
          placeholder="Select Time"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleMeetChange}
        />
        {bookLoading ? (
          <span className="loading loading-bars loading-md"></span>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
            <input
              type="text"
              name="book"
              value={meetData?.book || ""}
              placeholder="Next Book"
              className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
              disabled
              onChange={handleMeetChange}
            />
            {/* <select
            name="book"
            className="select select-bordered rounded-lg py-3 px-3 border-indigo-600 placeholder-white-500 text-white w-full lg:w-1/2"
          >
            {books.map((book) => (
              <option value={book.id} key={book.id}>
                {" "}
                {book.id === nextMeet.book.id && "selected"}
                <div className="btn-outline px-5 py-2 border rounded-lg flex gap-4">
                  <h2 className="text-xl">{book.title} -- </h2>
                  <h3 className="text-l">{book.author}</h3>
                </div>
              </option>
            ))}
          </select> */}
            <button
              className="btn btn-outline w-full lg:w-1/2"
              onClick={handleSelectBook}
            >
              Select Book
            </button>
          </div>

          //   className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          //   onChange={handleSignupChange}
        )}

        <button className="btn btn-wide btn-ghost" type="submit">
          Create Meeting
        </button>
        {/* <Alert content={alertMsg} /> */}
      </form>
      <SelectBook books={books} setMeetData={setMeetData} meetData={meetData} />
    </>
  );
};
export default CreateMeeting;
