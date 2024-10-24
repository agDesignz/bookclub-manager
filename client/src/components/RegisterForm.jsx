import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const [signupData, setSignupData] = useState({});
  const { postAuthData } = useAuth();

  function handleSignupChange(e) {
    // updateFormMessage();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const submitSignup = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = signupData;
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    } else {
      postAuthData("/api/user", signupData);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={submitSignup}
      >
        <h2>Register</h2>
        <label hidden htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="confirmPassword">
          Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <button type="submit">Create Account</button>
      </form>
    </>
  );
};
export default RegisterForm;
