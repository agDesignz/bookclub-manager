import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";

const ProfileScreen = () => {
  const { userData, handleUserApi } = useAuth();
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditChange = (e) => {
    // updateFormMessage();
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = editData;
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    } else {
      setLoading(true);
      const result = await handleUserApi("PUT", "/api/user", editData);
      setLoading(false);
      if (result.ok) {
        setEdit(false); // Close the edit form
      } else {
        setAlertMsg(
          "There was an error updating your profile. Please try again."
        );
      }
    }
  };

  useEffect(() => {
    setEditData(userData);
  }, [userData]);

  if (edit) {
    return (
      <div className="grow flex flex-col justify-center items-center h-full">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={submitEdit}
        >
          <label hidden htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={editData?.email || ""}
            placeholder="Email"
            className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
            onChange={handleEditChange}
          />
          <label hidden htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={editData?.username || ""}
            placeholder="Username"
            className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
            onChange={handleEditChange}
          />
          <label hidden htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={editData?.password || ""}
            placeholder="Enter Password"
            className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
            onChange={handleEditChange}
          />
          <label hidden htmlFor="confirmPassword">
            Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={editData?.confirmPassword || ""}
            placeholder="Confirm Password"
            className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
            onChange={handleEditChange}
          />

          <button className="btn btn-wide btn-ghost" type="submit">
            Update
          </button>
          <Alert content={alertMsg} />
        </form>
      </div>
    );
  } else {
    return (
      <div className="grow flex flex-col justify-center items-center h-full">
        <div className="grow flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Username: {userData.username}</h2>
          <h2 className="text-2xl">Email: {userData.email}</h2>
          <button
            className="mb-16 btn btn-outline"
            onClick={() => setEdit(true)}
          >
            Edit User Profile
          </button>
        </div>
      </div>
    );
  }
};
export default ProfileScreen;
