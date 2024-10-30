import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const query = await fetch("/api/user/users", {
        method: "GET",
        credentials: "include",
      });
      if (query.ok) {
        const payload = await query.json();
        console.log(payload);
        setUsers(payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [userData]);

  return (
    <div className="grow flex flex-col justify-center items-center h-full">
      {loading ? (
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
      )}
    </div>
  );
};
export default AdminScreen;
