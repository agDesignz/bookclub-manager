import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const remove = await fetch("/api/user/logout", {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" },
    });
    const result = await remove.json();
    console.log(result);
    if (result?.status === "success") {
      navigate("/");
    }
  };
  return (
    <div>
      Header
      <button onClick={logoutHandler}>LOG OUT</button>
    </div>
  );
};
export default Header;
