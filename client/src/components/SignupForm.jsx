import { useState } from "react";

const SignupForm = () => {
  const [signupData, setSignupData] = useState({});

  function handleSignupChange(e) {
    // updateFormMessage();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const query = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(query);
    } catch (error) {
      console.log(error);
    }
    const result = await query.json();
    console.log(result);
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={submitSignup}
      >
        <h2>Register</h2>
        <label hidden htmlFor="userName">
          Username
        </label>
        <input
          type="text"
          name="userName"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="pass1">
          Password
        </label>
        <input
          type="password"
          name="pass1"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <label hidden htmlFor="pass2">
          Password
        </label>
        <input
          type="password"
          name="pass2"
          className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
          onChange={handleSignupChange}
        />
        <button type="submit">Create Account</button>
      </form>
    </>
  );
};
export default SignupForm;
