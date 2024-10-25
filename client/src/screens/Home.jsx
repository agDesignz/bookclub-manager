import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="grow flex flex-col justify-center items-center">
      {isLoggedIn ? <Dashboard /> : <Landing />}
    </div>
  );
};
export default Home;
