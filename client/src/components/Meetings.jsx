import { useEffect, useState } from "react";
import getMeets from "../api/meetings/getMeets";
import MeetingBox from "./MeetingBox";

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
    <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
      {isLoading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        allMeetings.map((meeting) => (
          <div className="border-slate-200 sm:border rounded-lg p-4 md:p-8">
            <MeetingBox meeting={meeting} />
          </div>
        ))
      )}
    </div>
  );
};
export default Meetings;
