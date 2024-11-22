// import { useEffect, useState } from "react";
// import getLatestMeet from "../api/meetings/getLatestMeet";
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
        <div className="flex flex-col gap-4 p-4">
          <p className="text-center">Current Book</p>
          <div className="flex gap-2 justify-center">
            <div className="flex flex-col grow">
              <h2 className="text-3xl">{meeting?.book?.title || "TBA"}</h2>
              <h4>{meeting?.book?.author}</h4>
            </div>
            <figure>
              <img
                className="h-full"
                src={`https://covers.openlibrary.org/b/id/${meeting?.book?.cover}-S.jpg`}
                alt={`Cover image of ${meeting?.book?.title}`}
              />
            </figure>
          </div>
          <p className="pt-2 text-center">Next Meeting</p>
          <div className="flex gap-2 items-stretch">
            <div className="rounded-md bg-sky-800 p-2">
              <p>{meeting?.date || "TBA"}</p>
            </div>
            <div className="rounded-md bg-amber-700 p-2">
              <p>{meeting?.time || "TBA"}</p>
            </div>
            <div className="rounded-md bg-violet-950 p-2 grow">
              <p className="text-center">{meeting?.location || "TBA"}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center"></div>
          {userData.isAdmin && (
            <Link className="btn btn-wide btn-outline" to="/admin">
              Update or Create Meeting
            </Link>
          )}
        </div>
      ) : (
        <div>No Meetings Yet</div>
      )}
    </div>
  );
};
export default NextMeeting;
