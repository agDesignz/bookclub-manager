import { Link } from "react-router-dom";
import DescriptionModal from "./DescriptionModal";

const MeetingBox = ({ meeting, isAdmin = false }) => {
  return (
    <div className="grid md:items-start gap-4 w-full grid-cols-[max-content_1fr]">
      <div className="col-span-2 flex flex-col md:grow">
        <h2 className="text-2xl sm:text-3xl">
          {meeting?.book?.title || "TBA"}
        </h2>
        <h4 className="text-md sm:text-lg">{meeting?.book?.author}</h4>
      </div>

      <DescriptionModal
        bookCover={meeting?.book?.cover}
        bookTitle={meeting?.book?.title}
        bookDescription={meeting?.book?.description}
        modalId={`modal_${meeting?.book?.id}`}
      />

      <div className="flex flex-col gap-2 items-stretch text-center">
        <div className="rounded-md bg-sky-800 p-2">
          <p>{meeting?.date || "TBA"}</p>
        </div>
        <div className="rounded-md bg-amber-700 p-2">
          <p>{meeting?.formattedTime || "TBA"}</p>
        </div>
        <div className="rounded-md bg-violet-900 p-2">
          <p className="">{meeting?.location || "TBA"}</p>
        </div>
        {isAdmin && (
          <Link className="btn btn-outline grow h-auto min-h-10" to="/admin">
            Update or Create Meeting
          </Link>
        )}
      </div>
    </div>
  );
};
export default MeetingBox;
