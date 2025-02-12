import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Alert from "./Alert";
import AltchaWidget from "./captcha/AltchaWidget";

const RegisterForm = () => {
  const [signupData, setSignupData] = useState({});
  const [alertMsg, setAlertMsg] = useState("");
  const { handleUserApi } = useAuth();
  const [altchaPayload, setAltchaPayload] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleSignupChange = (e) => {
    // updateFormMessage();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleAltchaVerify = (payload) => {
    setAltchaPayload(payload);
    setIsVerified(true);
  };

  const submitSignup = async (e) => {
    e.preventDefault();

    if (!altchaPayload) {
      alert("Please solve the Altcha challenge first!");
      return;
    }

    const { password, confirmPassword } = signupData;
    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    } else {
      const result = await handleUserApi("POST", "/api/user", {
        ...signupData,
        altchaPayload,
      });
      setSignupData({});
      !result.ok &&
        setAlertMsg("There was an error signing you up. Please try again.");
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
          value={signupData?.email || ""}
          placeholder="Email"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={signupData?.username || ""}
          placeholder="Username"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={signupData?.password || ""}
          placeholder="Enter Password"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="confirmPassword">
          Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={signupData?.confirmPassword || ""}
          placeholder="Confirm Password"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white w-full"
          onChange={handleSignupChange}
        />
        <AltchaWidget onVerify={handleAltchaVerify} />
        <button
          className="btn btn-wide btn-ghost"
          type="submit"
          disabled={!isVerified}
        >
          Create Account
        </button>
        <Alert content={alertMsg} />
      </form>
    </>
  );
};
export default RegisterForm;
