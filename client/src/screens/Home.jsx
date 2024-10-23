import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import useVerifyUser from "../hooks/useVerifyUser";

const Home = () => {
  const { isLoggedIn } = useVerifyUser();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);

  return (
    <div className="grow flex flex-col justify-center items-center">
      {loggedIn ? <Dashboard /> : <Landing />}
    </div>
  );
};
export default Home;
