import { Link } from "react-router-dom";
import NextMeeting from "./MeetingGrid";

const Dashboard = () => {
  return (
    <section className="dashboard grid gap-4 sm:grid-cols-2">
      {/* <div className="md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1"> */}
      <NextMeeting heading="Next Meeting" />
      {/* </div> */}
      <div className="flex flex-col gap-2 mt-4 md:mt-0 items-stretch justify-center self-end md:self-center xl:grid xl:grid-cols-2 md:p-8">
        <Link to="/search">
          <div className="rounded-md shadow-md px-4 py-8 bg-teal-800 ">
            <h2 className="text-center text-2xl">Book Search</h2>
          </div>
        </Link>

        <Link to="/suggestions">
          <div className="rounded-md shadow-md px-4 py-8 bg-amber-700">
            <h2 className="text-center text-2xl">Book Suggestions</h2>
          </div>
        </Link>

        <Link to="/archive">
          <div className="rounded-md shadow-md px-4 py-8 bg-violet-900">
            <h2 className="text-center text-2xl">Archives</h2>
          </div>
        </Link>
      </div>
    </section>
  );
};
export default Dashboard;
