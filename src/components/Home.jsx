import React, { useState, useEffect, useRef } from "react";
import Recent from "../components/pages/Recent";
import Top from "../components/pages/Top";
import { CgProfile } from "react-icons/cg";
import Nav from "./pages/Nav";
import Developers from "./pages/Developers";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { BiSkipNext } from "react-icons/bi";
import logo from "../assets/image/lolo.jpg";

function Home() {
  const [toggle, setToggle] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [currentCover, setCurrentCover] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio()); // Use a single audio object ref

  const HandleToggle = () => {
    if (window.innerWidth < 730) {
      setToggle(!toggle);
    }
  };

  const handlePlayMusic = (url, cover, title) => {
    if (currentAudioUrl === url) {
      // Toggle play/pause if the same song is clicked
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudioUrl(url);
      setCurrentCover(cover);
      setCurrentTitle(title);
      setIsPlaying(true); // Automatically play the new song
    }
  };

  // Handle audio playback control
  useEffect(() => {
    const audio = audioRef.current;

    // If a new track URL is set, update the audio source
    if (currentAudioUrl) {
      audio.src = currentAudioUrl;
      audio.load(); // Load the new track
    }

    // Play or pause based on `isPlaying` state
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    // Cleanup when the component unmounts or audio changes
    return () => {
      audio.pause();
      audio.src = ""; // Clear the audio source to release memory
    };
  }, [currentAudioUrl, isPlaying]);

  return (
    <>
      <main className="grid bg-black grid-cols-4">
        <div className={`${toggle ? "hidden" : "col-span-1 h-screen"}`}>
          <Nav />
        </div>

        <section
          className={`col-span-3 ${
            toggle && "col-span-4 h-screen ml-[1.4rem]"
          }`}
        >
          <nav
            className={`text-white fixed ${
              toggle ? "w-[95vw]" : "px-4 w-[75vw]"
            } flex justify-between z-20 bg-black p-2`}
          >
            <div className="flex gap-4">
              <button className="text-lg mb-2 border-green-600 border-b-4 rounded-md cursor-pointer focus:outline-none">
                Explore
              </button>
              <button className="text-lg cursor-pointer focus:outline-none">
                All
              </button>
            </div>

            <CgProfile
              size={50}
              className="cursor-pointer"
              onClick={HandleToggle}
            />
          </nav>

          {/* Audio Element */}
          <div
            className={`text-white fixed bottom-0 ${
              toggle ? "w-[95vw]" : "px-4 w-[75vw]"
            } flex gap-8 items-center bg-[#121212] z-20 p-2`}
          >
            <img
              src={currentCover || logo}
              alt="Current Cover"
              className="mt-2 rounded-lg"
              style={{ width: "50px", height: "50px", objectFit: "cover" }} // Adjust size as needed
            />

            <div className="flex gap-2 items-center">
              <p className="text-white text-[14px] mt-2">
                {currentTitle || "title will be here"}
              </p>
              <div className="flex mt-3 items-center">
                {isPlaying ? (
                  <CiPause1 size={24} onClick={() => setIsPlaying(false)} />
                ) : (
                  <CiPlay1 size={24} onClick={() => setIsPlaying(true)} />
                )}
                <BiSkipNext size={24} onClick={() => {}} />
              </div>
            </div>
          </div>

          <div className="p-2 md:ml-4 mt-[5rem] h-[80vh] overflow-y-auto">
            {/* Pass handlePlayMusic to Recent and Top */}
            <Recent onPlayMusic={handlePlayMusic} />
            <Top onPlayMusic={handlePlayMusic} />
            <Developers />
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
