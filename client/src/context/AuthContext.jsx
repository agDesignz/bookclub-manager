// AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state

  const handleUserApi = async (req, path, data) => {
    try {
      const query = await fetch(path, {
        method: req,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log("auth query:", query.ok);
      if (query.ok) {
        const updatedData = await query.json(); // Get the updated user data from the response
        setUserData(updatedData); // Update userData in the context
        setIsLoggedIn(true); // Ensure the user is still logged in
      }
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
      // setLoading(true);
      setUserData({});
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
      if (response.ok) {
        const data = await response.json();
        // console.log("data:", data);
        setUserData(data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Error checking login status:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Set loading to false once the check is complete
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // To log the updated `userData` after it changes
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      // console.log("userData has been updated:", userData);
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, loading, logoutHandler, handleUserApi }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
