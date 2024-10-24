import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const LoginForm = ({ currentLocation }) => {
  const [loginData, setLoginData] = useState({});
  // const navigate = useNavigate();

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
      console.log("You Are Here:", currentLocation);
      // navigate(currentLocation, { state: { refresh: true } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={submitLogin}>
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
