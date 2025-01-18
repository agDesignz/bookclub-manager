import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import getLatestMeet from "../../api/meetings/getLatestMeet";
import CreateMeeting from "../../components/admin/CreateMeeting";
import UserList from "../../components/admin/UserList";

const AdminScreen = () => {
  const [meetLoading, setMeetLoading] = useState(true);
  const [nextMeet, setNextMeet] = useState({});
  const { userData } = useAuth();

  const fetchLatestMeet = async () => {
    const response = await getLatestMeet();
    setNextMeet(response);
    setMeetLoading(false);
  };

  useEffect(() => {
    fetchLatestMeet();
  }, []);

  return (
    <div className="grow h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          {meetLoading ? (
            <span className="loading loading-bars loading-md"></span>
          ) : (
            <CreateMeeting edit={true} />
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <UserList />
        </div>
      </div>
    </div>
  );
};
export default AdminScreen;
