import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import PlayMusic from "./components/pages/PlayMusic";
import { MusicProvider } from "./components/Context/MusicContext";
import { ToggleProvider } from "./components/Context/ToggleContext";
import NotFound from "./components/pages/NotFound"; // Import the NotFound component

const Home = lazy(() => import("./components/Home"));
const Upload = lazy(() => import("./components/pages/Upload"));
const Search = lazy(() => import("./components/pages/Search"));
const Profile = lazy(() => import("./components/pages/Profile"));

function App() {
  return (
    <MusicProvider>
      <ToggleProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/user" element={<Profile />} />
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </Suspense>
        <PlayMusic />
      </ToggleProvider>
    </MusicProvider>
  );
}

export default App;
