import { useEffect, useState } from "react";
import updateUser from "../../api/users/updateUser";
import getUsers from "../../api/users/getUsers";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  const getAllUsers = async () => {
    setUserLoading(true);
    try {
      const payload = await getUsers();
      setUsers(payload || []); // Ensure it's always an array
    } catch (error) {
      console.log(error);
      setUsers([]); // Fallback to an empty array on error
    } finally {
      setUserLoading(false);
    }
  };

  const approveUser = async (user) => {
    setUserLoading(true);
    const approvalData = { id: user.id, isApproved: true };
    try {
      const payload = await updateUser(approvalData);
      if (payload.success) {
        // Update the specific user in the state
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === user.id ? { ...u, isApproved: payload.isApproved } : u
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {userLoading ? (
        <span className="loading loading-bars loading-md"></span>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <h2>Users:</h2>
          <ul role="list" className="divide-y divide-gray-100 w-full">
            {users?.map((user) => (
              <li
                className="flex justify-between gap-x-6 p-5 bg-blue-400"
                key={user.id}
              >
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
                <div className="flex min-w-0 gap-4">
                  {user.isApproved ? (
                    <p>Approved</p>
                  ) : (
                    <button onClick={() => approveUser(user)}>
                      Approve User
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default UserList;
