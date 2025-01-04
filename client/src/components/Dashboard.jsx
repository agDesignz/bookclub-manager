import { Link } from "react-router-dom";
import NextMeeting from "./NextMeeting";

const Dashboard = () => {
  return (
    <section className="dashboard container grid gap-2 sm:gap-4 grid-cols-1 lg:grid-cols-2">
      {/* <div className="flex flex-col gap-4 items-stretch"> */}
      <div className="lg:row-span-3">
        <NextMeeting />
      </div>
      <Link to="/search">
        <div className="rounded-xl shadow-md px-4 py-8 bg-teal-800">
          <h2 className="text-center text-2xl">Book Search</h2>
        </div>
      </Link>

      <Link to="/suggestions">
        <div className="rounded-xl shadow-md px-4 py-8 bg-amber-700">
          <h2 className="text-center text-2xl">Book Suggestions</h2>
        </div>
      </Link>

      <Link to="/archive">
        <div className="rounded-xl shadow-md px-4 py-8 bg-violet-900">
          <h2 className="text-center text-2xl">Archives</h2>
        </div>
      </Link>
      {/* </div> */}
    </section>
  );
};
export default Dashboard;
