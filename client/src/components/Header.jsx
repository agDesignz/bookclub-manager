import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();
  const { logoutHandler, userData } = useAuth();

  // Close dropdown on click, thanks to Malik Hamza: https://medium.com/@malikhamzav/how-to-close-daisyui-dropdown-on-click-ea65c5749410
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <header>
      <div className="navbar bg-transparent">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Bookclub App
          </Link>
        </div>
        {isLoggedIn && (
          <div>
            <p className="text-xs">{userData.username}</p>
          </div>
        )}

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </div>
            {isLoggedIn && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-950 rounded-box z-[1] mt-3 p-2 w-max shadow text-right"
              >
                <li onClick={handleClick}>
                  <Link to="/">Dashboard</Link>
                </li>
                <li onClick={handleClick}>
                  <Link to="/profile">My Profile</Link>
                </li>
                {userData.isAdmin && (
                  <li onClick={handleClick}>
                    <Link to="/admin">Admin Page</Link>
                  </li>
                )}
                <li className="mt-4" onClick={handleClick}>
                  <button onClick={logoutHandler}>Log out</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
