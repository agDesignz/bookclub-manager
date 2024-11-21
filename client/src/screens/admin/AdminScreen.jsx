import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import getMeets from "../../api/meetings/getMeets";
import getLatestMeet from "../../api/meetings/getLatestMeet";
import CreateMeeting from "../../components/admin/CreateMeeting";
// import getUsers from "../../api/users/getUsers";
import UserList from "../../components/admin/UserList";

const AdminScreen = () => {
  // const [users, setUsers] = useState([]);
  // const [userLoading, setUserLoading] = useState(false);
  const [meetLoading, setMeetLoading] = useState(true);
  const [nextMeet, setNextMeet] = useState({});
  const { userData } = useAuth();

  // const getAllUsers = async () => {
  //   setUserLoading(true);
  //   try {
  //     const payload = await getUsers();
  //     if (payload) setUsers(payload);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setUserLoading(false);
  //   }
  // };

  // const fetchMeets = async () => {
  //   const meets = await getMeets();
  //   console.log(meets);
  // };

  const fetchLatestMeet = async () => {
    const response = await getLatestMeet();
    setNextMeet(response);
    setMeetLoading(false);
  };

  useEffect(() => {
    fetchLatestMeet();
  }, []);

  // useEffect(() => {
  //   getAllUsers();
  //   // fetchLatestMeet();
  // }, [userData]);

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
          <UserList
          // users={users}
          // setUsers={setUsers}
          // setUserLoading={setUserLoading}
          />
        </div>
        {/* {userLoading ? (
          <span className="loading loading-bars loading-md"></span>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {users.map((user, idx) => (
              <li className="flex justify-between gap-x-6 py-5" key={idx}>
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6">
                      {user.username}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5">
                      {user.email}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};
export default AdminScreen;
