import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { isLoggedIn, userData } = useAuth();

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      console.log("Home userData:", userData.isAdmin);
    }
  }, [userData]); // This will run whenever userData changes
  return (
    <div className="grow flex flex-col items-center">
      {isLoggedIn ? <Dashboard /> : <Landing />}
    </div>
  );
};

export default Home;
