import { createContext, useState, useEffect, useContext } from "react";
import getLatestMeet from "../api/getLatestMeet";
import createMeeting from "../api/createMeeting";
import updateMeeting from "../api/updateMeeting";

export const MeetContext = createContext();

export const MeetContextProvider = ({ children }) => {
  const [meetingLoading, setMeetingLoading] = useState(true);
  const [meeting, setMeeting] = useState(null);

  const fetchLatestMeet = async () => {
    try {
      const response = await getLatestMeet();
      setMeeting(response);
      setMeetingLoading(false);
      console.log("meeting:", response);
    } catch (error) {
      console.log(error);
    }
  };

  const newMeeting = async (data) => {
    try {
      const response = await createMeeting(data);
      if (response) {
        console.log("new response:", response);
        setMeeting(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editMeeting = async (data) => {
    try {
      const response = await updateMeeting(data);
      if (response) {
        console.log("edit response:", response);
        setMeeting(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestMeet();
  }, []);

  return (
    <MeetContext.Provider
      value={{
        meetingLoading,
        setMeetingLoading,
        meeting,
        newMeeting,
        editMeeting,
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeetingContext = () => {
  return useContext(MeetContext);
};
