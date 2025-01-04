// import { useEffect, useState } from "react";
// import getLatestMeet from "../api/meetings/getLatestMeet";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMeetingContext } from "../context/MeetContext";

const NextMeeting = () => {
  const { userData } = useAuth();
  const { meetingLoading, meeting } = useMeetingContext();

  return (
    <div className="flex justify-center items-center h-full p-2 md:p-0">
      {/* <h2 className="text-center text-2xl">Current Book</h2> */}
      {meetingLoading ? (
        <h2>Still Loading</h2>
      ) : meeting ? (
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 w-full">
          {/* <div className="flex gap-4 mb-4 md:mb-6 justify-center"> */}
          <div className="flex flex-col md:grow">
            <h2 className="text-3xl">{meeting?.book?.title || "TBA"}</h2>
            <h4>{meeting?.book?.author}</h4>
          </div>
          <figure>
            <img
              className="h-full w-auto"
              src={`https://covers.openlibrary.org/b/id/${meeting?.book?.cover}-M.jpg`}
              alt={`Cover image of ${meeting?.book?.title}`}
            />
          </figure>
          {/* </div> */}
          <p className="text-center">Next Meeting</p>
          <div className="flex flex-wrap gap-2 items-stretch">
            <div className="rounded-md bg-sky-800 p-2">
              <p>{meeting?.date || "TBA"}</p>
            </div>
            <div className="rounded-md bg-amber-700 p-2">
              <p>{meeting?.time || "TBA"}</p>
            </div>
            <div className="rounded-md bg-violet-900 p-2 grow">
              <p className="text-center">{meeting?.location || "TBA"}</p>
            </div>
          </div>
          {userData.isAdmin && (
            <Link
              className="btn btn-wide btn-outline grow h-auto min-h-10"
              to="/admin"
            >
              Update or Create Meeting
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:gap-8">
          <h2 className="text-2xl text-center">No Meetings Yet</h2>
          <Link className="btn btn-wide btn-outline grow" to="/admin">
            Create Meeting
          </Link>
        </div>
      )}
    </div>
  );
};
export default NextMeeting;
