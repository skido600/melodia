import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/ultil";

import Home from "../Home";
import HomesL from "./HomesL";
import Loader from "./Loader";

function Loginm() {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
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
    return <Home />;
  } else {
    return <HomesL />;
  }
}

export default Loginm;
