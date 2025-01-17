import { Link } from "react-router-dom";
import NextMeeting from "./NextMeeting";

const Dashboard = () => {
  return (
    <section className="dashboard container grid gap-2 md:gap-x-10 md:gap-y-4 lg:gap-x-12 grid-cols-1 md:grid-cols-2 llg:grid-cols-[2fr_3fr] lxl:grid-cols-[1fr_2fr]">
      {/* <h2 className="">Current Book</h2> */}
      <div className="md:row-start-2 md:row-span-1 md:col-start-1 md:col-span-1">
        <NextMeeting />
      </div>
      <div className="flex flex-col gap-2 mt-4 md:mt-0 items-stretch justify-center md:row-start-2 md:row-span-1 md:col-start-2 md:col-span-1 md:self-center xl:grid xl:grid-cols-2 lg:p-8">
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
