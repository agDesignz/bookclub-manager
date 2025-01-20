import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import AwaitApproval from "../components/AwaitApproval";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { isLoggedIn, userData } = useAuth();

  useEffect(() => {
    // console.log("userData:", userData);
  }, []);

  return (
    <div className="home h-full md:my-auto">
      {isLoggedIn ? (
        userData.isApproved || userData.isAdmin ? (
          <Dashboard />
        ) : (
          <AwaitApproval />
        )
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Home;
