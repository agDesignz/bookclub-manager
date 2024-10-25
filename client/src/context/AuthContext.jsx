// AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const postAuthData = async (path, data) => {
    try {
      const query = await fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("auth query:", query.ok);
      query.ok && setIsLoggedIn(true);
      return query;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const logoutHandler = async () => {
    try {
      const remove = await fetch("/api/user/logout", {
        method: "POST",
        body: "",
        headers: { "Content-Type": "application/json" },
      });
      const result = await remove.json();
      console.log("logout result:", result);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/user/auth", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Make sure cookies are sent with the request
      });
      // console.log("auth:", response);
      if (response.ok) {
        const userData = await response.json();
        // console.log("User is authenticated:", userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutHandler, postAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
