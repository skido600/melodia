import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// Loader;
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";

const Signin = lazy(() => import("./components/Auth/Signin"));
const Login = lazy(() => import("./components/Auth/Login"));
const HomesL = lazy(() => import("./components/Loader/HomesL"));
const Home = lazy(() => import("./components/Home"));
function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomesL />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Add other routes here as needed */}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
