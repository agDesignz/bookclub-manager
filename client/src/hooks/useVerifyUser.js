import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";

export default function useVerifyUser() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  function verifyUser() {
    const cookie = Cookie.get("jwt");
    console.log("cookie:", cookie);
    if (cookie && cookie.length) {
      const decodedToken = jwtDecode(cookie);
      setIsLoggedIn(true);
      setUserData(decodedToken.id);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }

  // Whenever this hook loads, run the verifyUser function, and update state
  useEffect(() => {
    verifyUser()
  }, [])

  // I am making the state of whether the user is logged in available from this hook
  return {
    isLoggedIn,
    userData
  }

}