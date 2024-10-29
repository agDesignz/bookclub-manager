import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Alert from "./Alert";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const { handleUserApi } = useAuth();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const result = await handleUserApi("POST", "/api/user/login", loginData);
    setLoginData({});
    !result.ok && setAlertMsg("Invalid email or password.");
  };

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={submitLogin}>
      <label hidden htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={loginData?.email || ""}
        placeholder="Email"
        className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
        onChange={handleLoginChange}
      />
      <label hidden htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={loginData?.password || ""}
        placeholder="Enter Password"
        className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
        onChange={handleLoginChange}
      />
      <button className="btn btn-wide btn-ghost" type="submit">
        Log In
      </button>
      <Alert content={alertMsg} />
    </form>
  );
};
export default LoginForm;
