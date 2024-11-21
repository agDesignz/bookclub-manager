import { useEffect, useState } from "react";
import getMeets from "../api/meetings/getMeets";

const Meetings = () => {
  const [allMeetings, setAllMeetings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeetingData = async () => {
    const meetingData = await getMeets();
    setAllMeetings(meetingData);
    console.log(meetingData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeetingData();
  }, []);
  return (
    <>
      {isLoading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        allMeetings.map((meet) => (
          <div key="meet.id">
            <h2>Date: {meet.date}</h2>
            <h2>Location: {meet.location}</h2>
            <h2>Book: {meet.book?.title}</h2>
          </div>
        ))
      )}
    </>
  );
};
export default Meetings;
