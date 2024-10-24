import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logoutHandler } = useAuth();

  return (
    <div>
      Header
      <button onClick={logoutHandler}>LOG OUT</button>
    </div>
  );
};
export default Header;
