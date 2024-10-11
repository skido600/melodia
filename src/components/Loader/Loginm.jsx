import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/ultil";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import HomesL from "./HomesL";
import Loader from "./Loader";

function Loginm() {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const accountActive = localStorage.getItem("account_active");
    if (accountActive === "true") {
      setIsActive(true);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);

      if (currentUser) {
        localStorage.setItem("account_active", "true");
        setIsActive(true);
        // Redirect to /homepage/home once authenticated
        navigate("/homepage/home");
      } else {
        localStorage.removeItem("account_active");
        setIsActive(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loader) {
    return <Loader />;
  }

  if (!isActive) {
    return <HomesL />;
  }

  return null; // Since you are navigating, there's no need to return a component here
}

export default Loginm;
