import { createContext, useState, useEffect, useContext } from "react";
import getLatestMeet from "../api/getLatestMeet";

export const MeetContext = createContext();

export const MeetContextProvider = ({ children }) => {
  const [meetingLoading, setMeetingLoading] = useState(true);
  const [meeting, setMeeting] = useState({});

  const fetchLatestMeet = async () => {
    const response = await getLatestMeet();
    setMeeting(response);
    setMeetingLoading(false);
    // console.log(response);
  };

  useEffect(() => {
    fetchLatestMeet();
  }, []);

  return (
    <MeetContext.Provider
      value={{ meetingLoading, setMeetingLoading, meeting, setMeeting }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeetingContext = () => {
  return useContext(MeetContext);
};
