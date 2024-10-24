import { useState } from "react";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({});

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    try {
      const query = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await query.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={submitLogin}>
      <h2>Register</h2>
      <label hidden htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
        onChange={handleLoginChange}
      />
      <label hidden htmlFor="password">
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        className="border rounded-lg py-3 px-3 bg-transparent border-indigo-600 placeholder-white-500 text-white"
        onChange={handleLoginChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
};
export default LoginForm;
