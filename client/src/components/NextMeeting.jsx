// import { useEffect, useState } from "react";
// import getLatestMeet from "../api/getLatestMeet";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMeetingContext } from "../context/MeetContext";

const NextMeeting = () => {
  const { userData } = useAuth();
  const { meetingLoading, meeting } = useMeetingContext();

  return (
    <div>
      {meetingLoading ? (
        <h2>Still Loading</h2>
      ) : meeting ? (
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <div className="flex gap-4 md:gap-8">
              <div className="flex flex-col">
                <h2>Next Book: {meeting.book.title}</h2>
                <h2>Next Meeting: {meeting.date}</h2>
                <h2>Meeting Time: {meeting.time}</h2>
                <h2>Meeting at: {meeting.location}</h2>
              </div>
              <div className="flex flex-col justify-between items-center">
                <figure>
                  <img
                    className=""
                    src={`https://covers.openlibrary.org/b/id/${meeting.book.cover}-S.jpg`}
                    alt={`Cover image of ${meeting.book.title}`}
                  />
                </figure>
              </div>
            </div>
            {userData.isAdmin && (
              <Link className="btn btn-wide btn-outline" to="/admin">
                Update or Create Meeting
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div>No Meetings Yet</div>
      )}
    </div>
  );
};
export default NextMeeting;
