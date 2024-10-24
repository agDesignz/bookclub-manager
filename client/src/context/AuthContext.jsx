// AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/user/auth", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Make sure cookies are sent with the request
      });
      console.log("auth:", response);
      if (response.ok) {
        const userData = await response.json();
        console.log("User is authenticated:", userData);
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
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
