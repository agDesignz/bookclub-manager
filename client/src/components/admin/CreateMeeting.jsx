import { useEffect, useState } from "react";
import getBooks from "../../api/getBooks";
import SelectBook from "./SelectBook";
import { useMeetingContext } from "../../context/MeetContext";
import checkDate from "../../utils/checkDate";

const CreateMeeting = ({ edit }) => {
  const { meeting, newMeeting, editMeeting, deleteMeeting } =
    useMeetingContext();
  const [isEditing, setIsEditing] = useState(meeting);
  const [bookLoading, setBookLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [meetData, setMeetData] = useState(isEditing ? meeting : {});

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
    console.log("Date in State:", meetData.date);
    const dateCheck = checkDate(meetData.date);
    if (dateCheck != "valid") {
      alert(dateCheck);
      return;
    }
    if (isEditing) {
      await editMeeting(meetData);
    } else {
      await newMeeting(meetData);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("delete data:", meeting.id, meeting.book_id);
    const response = await deleteMeeting(meeting.id, meeting.book_id);
    console.log("delete response:", response);
  };

  const toggleEditing = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMeetData({});
    } else {
      setMeetData(meeting);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    // setIsEditing(meeting);
    fetchBooks();
    // if (isEditing) {
    //   setMeetData(meeting);
    // }
  }, []);

  useEffect(() => {
    setMeetData(meeting);
  }, [meeting]);

  return (
    <>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 lg:gap-8 w-full">
          <h2 className="grow">
            {isEditing ? "Edit Meeting" : "Create Meeting"}
          </h2>
          {isEditing && (
            <button className="btn btn-error btn-xs" onClick={handleDelete}>
              Delete Meeting
            </button>
          )}
          {meeting && (
            <button className="btn btn-outline btn-xs" onClick={toggleEditing}>
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
