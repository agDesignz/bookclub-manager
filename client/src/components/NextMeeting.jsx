import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMeetingContext } from "../context/MeetContext";
import DescriptionModal from "./DescriptionModal";
import MeetingBox from "./MeetingBox";

const NextMeeting = () => {
  const { userData } = useAuth();
  const { meetingLoading, meeting } = useMeetingContext();

  return (
    <div className="flex justify-center items-center h-full border-slate-200 md:border rounded-lg md:p-8">
      {meetingLoading ? (
        <h2>Still Loading</h2>
      ) : meeting ? (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-lg sm:text-xl">Next Meeting</h2>
          <MeetingBox meeting={meeting} isAdmin={userData.isAdmin} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:gap-8">
          <h2 className="text-2xl text-center">No Meetings Yet</h2>
          {userData.isAdmin && (
            <Link className="btn btn-wide btn-outline grow" to="/admin">
              Create Meeting
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
export default NextMeeting;
