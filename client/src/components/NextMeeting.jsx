import { useEffect, useState } from "react";
import getLatestMeet from "../api/getLatestMeet";
import { useAuth } from "../context/AuthContext";

const NextMeeting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nextMeet, setNextMeet] = useState({});
  const { userData } = useAuth();

  const fetchLatestMeet = async () => {
    const response = await getLatestMeet();
    setNextMeet(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLatestMeet();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h2>Still Loading</h2>
      ) : nextMeet ? (
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <div className="flex gap-4 md:gap-8">
              <div className="flex flex-col">
                <h2>Next Book: {nextMeet.book.title}</h2>
                <h2>Next Meeting: {nextMeet.meet_date}</h2>
                <h2>Meeting at: {nextMeet.location}</h2>
              </div>
              <div className="flex flex-col justify-between items-center">
                <figure>
                  <img
                    className=""
                    src={`https://covers.openlibrary.org/b/id/${nextMeet.book.cover}-S.jpg`}
                    alt={`Cover image of ${nextMeet.book.title}`}
                  />
                </figure>
              </div>
            </div>
            {userData.isAdmin && <h2>Admin</h2>}
          </div>
        </div>
      ) : (
        <div>No Meetings Yet</div>
      )}
    </div>
  );
};
export default NextMeeting;
