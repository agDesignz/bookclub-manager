import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import AwaitApproval from "../components/AwaitApproval";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { isLoggedIn, userData } = useAuth();

  return (
    <div className="grow flex flex-col items-center">
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
