import { createContext, useState, useEffect } from "react";
import getLatestMeet from "../api/getLatestMeet";

export const MeetContext = createContext();

export const MeetContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [meet, setMeet] = useState({});

  const fetchLatestMeet = async () => {
    const response = await getLatestMeet();
    console.log(response);
  };

  useEffect(() => {
    fetchLatestMeet();
  }, []);

  return (
    <MeetContext.Provider value={{ meet, setMeet }}>
      {children}
    </MeetContext.Provider>
  );
};
