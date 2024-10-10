import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/ultil";

import Home from "../Home";
import HomesL from "./HomesL";
import Loader from "./Loader";
import PlayMusic from "../pages/PlayMusic";

function Loginm() {
  const [loader, setLoader] = useState(true); // State to manage loading screen
  const [user, setUser] = useState(null); // State to store Firebase user
  const [isActive, setIsActive] = useState(false); // State to track account active status

  useEffect(() => {
    // Check localStorage on mount to see if the account is already active
    const accountActive = localStorage.getItem("account_active");
    if (accountActive === "true") {
      setIsActive(true);
    }

    // Listen to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);

      if (currentUser) {
        localStorage.setItem("account_active", "true");
        setIsActive(true);
      } else {
        localStorage.removeItem("account_active");
        setIsActive(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loader) {
    return <Loader />;
  }

  if (isActive) {
    // Wrap Home and PlayMusic in a parent element like a fragment or div
    return (
      <>
        <Home />
        <PlayMusic />
      </>
    );
  } else {
    return <HomesL />;
  }
}

export default Loginm;
