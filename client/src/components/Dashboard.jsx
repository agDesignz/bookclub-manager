import { Link } from "react-router-dom";
import NextMeeting from "./NextMeeting";

const Dashboard = () => {
  return (
    <section className="dashboard container grid gap-6 grid-cols-1 md:grid-cols-2">
      <h2 className="text-center text-2xl">Current Book</h2>
      <div className="md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1">
        <NextMeeting />
      </div>
      <div className="flex flex-col gap-4 items-stretch md:row-start-2 md:row-span-1 md:col-start-2 md:col-span-1">
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
      </div>
    </section>
  );
};
export default Dashboard;
