import { useEffect, useState } from "react";
import getMeets from "../api/meetings/getMeets";

const Meetings = () => {
  const [allMeetings, setAllMeetings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeetingData = async () => {
    const meetingData = await getMeets();
    setAllMeetings(meetingData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeetingData();
  }, []);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {isLoading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        allMeetings.map((meet) => (
          <div key={meet.id}>
            <h2>Date: {meet.date}</h2>
            <h2>Location: {meet.location}</h2>
            <h2>Book: {meet.book?.title}</h2>
          </div>
        ))
      )}
    </div>
  );
};
export default Meetings;
