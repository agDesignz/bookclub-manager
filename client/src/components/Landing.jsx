import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Landing = () => {
  const [newUser, setNewUser] = useState(false);
  const currentLocation = useLocation().pathname;

  const switchUserStatus = () => {
    setNewUser(!newUser);
  };

  return (
    <div className="grow flex flex-col justify-center items-center h-full">
      <div className="grow flex flex-col justify-center items-center">
        {newUser ? (
          <RegisterForm currentLocation={currentLocation} />
        ) : (
          <LoginForm currentLocation={currentLocation} />
        )}
      </div>
      <button className="mb-16" onClick={switchUserStatus}>
        {newUser ? "Already a user? Log in here." : "Register to join."}
      </button>
    </div>
  );
};
export default Landing;
