import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import PlayMusic from "./components/pages/PlayMusic";
import { MusicProvider } from "./components/Context/MusicContext"; // Ensure the correct import path
import { ToggleProvider } from "./components/Context/ToggleContext"; // Import the ToggleProvider

const Signin = lazy(() => import("./components/Auth/Signin"));
const Login = lazy(() => import("./components/Auth/Login"));
const Home = lazy(() => import("./components/Home"));
const Loginm = lazy(() => import("./components/Loader/Loginm"));
const Upload = lazy(() => import("./components/pages/Upload"));
const Search = lazy(() => import("./components/pages/Search"));
const Profile = lazy(() => import("./components/pages/Profile"));

function App() {
  return (
    <MusicProvider>
      <ToggleProvider>
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
        <PlayMusic />
      </ToggleProvider>
    </MusicProvider>
  );
}

export default App;
