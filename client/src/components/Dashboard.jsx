import { Link } from "react-router-dom";
import NextMeeting from "./NextMeeting";

const Dashboard = () => {
  return (
    <section className="dashboard container">
      <div className="flex flex-col gap-4 items-stretch">
        <NextMeeting />
        <Link to="/search">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Book Search</h2>
              <p>Placeholder for a book search option</p>
            </div>
          </div>
        </Link>

        <Link to="/suggestions">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Vote for books</h2>
              <p>Select the next book</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>

        <Link to="/archive">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Archives</h2>
              <p>Past meetings and books</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
export default Dashboard;
