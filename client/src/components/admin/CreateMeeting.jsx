import { useEffect, useState } from "react";
import getBooks from "../../api/getBooks";
import SelectBook from "./SelectBook";
import { useMeetingContext } from "../../context/MeetContext";
import checkDate from "../../utils/checkDate";

const CreateMeeting = ({ edit }) => {
  const [isEditing, setIsEditing] = useState(edit);
  const [bookLoading, setBookLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [meetData, setMeetData] = useState({});
  const { meetingLoading, meeting, newMeeting, editMeeting } =
    useMeetingContext();
  const meetingData = {
    id: meeting?.id,
    location: meeting?.location,
    date: meeting?.date,
    time: meeting?.time,
    bookId: meeting?.book.id,
    bookTitle: meeting?.book.title,
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateCheck = checkDate(meetData.date);
    if (dateCheck != "valid") {
      alert(dateCheck);
      return;
    }
    console.log(dateCheck);
    if (isEditing) {
      await editMeeting(meetData);
    } else {
      await newMeeting(meetData);
    }
  };

  const editOrCreate = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMeetData({});
    } else {
      setMeetData(meetingData);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    setIsEditing(meeting);
    fetchBooks();
    if (isEditing) {
      setMeetData(meetingData);
    }
  }, []);

  return (
    <>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 lg:gap-8 w-full justify-between">
          <h2>{isEditing ? "Edit Meeting" : "Create Meeting"}</h2>
          {meeting && (
            <button className="btn btn-outline btn-xs" onClick={editOrCreate}>
              {isEditing ? "New Meeting" : "Update Meeting"}
            </button>
          )}
        </div>
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
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 w-full">
            <button
              className="btn btn-outline w-full sm:w-1/2"
              onClick={handleSelectBook}
            >
              {meetData?.bookTitle || "Select Book"}
            </button>
            <button className="btn btn-success grow" type="submit">
              {isEditing ? "Update Meeting" : "Create Meeting"}
            </button>
          </div>
        )}
      </form>
      <SelectBook books={books} setMeetData={setMeetData} meetData={meetData} />
    </>
  );
};
export default CreateMeeting;
