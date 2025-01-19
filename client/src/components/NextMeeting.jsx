import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMeetingContext } from "../context/MeetContext";
import DescriptionModal from "./DescriptionModal";
import MeetingBox from "./MeetingBox";

const NextMeeting = () => {
  const { userData } = useAuth();
  const { meetingLoading, meeting } = useMeetingContext();

  return (
    <div className="flex justify-center items-center h-full lg:border-slate-200 md:border rounded-lg md:p-8">
      {meetingLoading ? (
        <h2>Still Loading</h2>
      ) : meeting ? (
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-lg sm:text-xl">Next Meeting</h2>
          <MeetingBox meeting={meeting} isAdmin={userData.isAdmin} />
        </div>
      ) : (
        // <div className="grid md:items-start gap-4 w-full items-stretch grid-cols-[max-content_1fr]">
        //   <div className="col-span-2 flex flex-col md:grow">
        //     <h2 className="text-lg sm:text-xl">{heading}</h2>
        //   </div>
        //   <div className="col-span-2 flex flex-col md:grow">
        //     <h2 className="text-2xl sm:text-3xl">
        //       {meeting?.book?.title || "TBA"}
        //     </h2>
        //     <h4 className="text-md sm:text-lg">{meeting?.book?.author}</h4>
        //   </div>
        //   <DescriptionModal
        //     bookCover={meeting?.book?.cover}
        //     bookTitle={meeting?.book?.title}
        //     bookDescription={meeting?.book?.description}
        //     modalId={`modal_${meeting?.book?.id}`}
        //   />

        //   <div className="flex flex-col gap-2 items-stretch text-center">
        //     <div className="rounded-md bg-sky-800 p-2">
        //       <p>{meeting?.date || "TBA"}</p>
        //     </div>
        //     <div className="rounded-md bg-amber-700 p-2">
        //       <p>{meeting?.formattedTime || "TBA"}</p>
        //     </div>
        //     <div className="rounded-md bg-violet-900 p-2">
        //       <p className="">{meeting?.location || "TBA"}</p>
        //     </div>
        //     {userData.isAdmin && (
        //       <Link
        //         className="btn btn-outline grow h-auto min-h-10"
        //         to="/admin"
        //       >
        //         Update or Create Meeting
        //       </Link>
        //     )}
        //   </div>
        // </div>
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
