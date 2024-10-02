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
const Loginm = lazy(() => import("./components/Loader/Loginm"));
const Upload = lazy(() => import("./components/pages/Upload"));
const Search = lazy(() => import("./components/pages/Search"));
const Profile = lazy(() => import("./components/pages/Profile"));
function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Loginm />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/user" element={<Profile />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
