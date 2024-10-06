import React, { useState } from "react";
import Recent from "../components/pages/Recent";
import Top from "../components/pages/Top";
import { CgProfile } from "react-icons/cg";
import Nav from "./pages/Nav";
import Developers from "./pages/Developers";

function Home() {
  const [toggle, setToggle] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null); // State for the currently playing audio
  const [currentCover, setCurrentCover] = useState(null); // State for the currently playing cover
  const [currentTitle, setCurrentTitle] = useState(null); // State for the currently playing title

  const HandleToggle = () => {
    if (window.innerWidth < 730) {
      setToggle(!toggle);
    }
  };

  const handlePlayMusic = (url, cover, title) => {
    if (currentAudio === url) {
      // If the same audio is clicked, pause it
      setCurrentAudio(null);
      setCurrentCover(null); // Reset cover
      setCurrentTitle(null); // Reset title
    } else {
      setCurrentAudio(url); // Set the current audio source to the clicked URL
      setCurrentCover(cover); // Set the current cover image
      setCurrentTitle(title); // Set the current title
    }
  };

  return (
    <>
      <main className="grid bg-black grid-cols-4">
        <div className={` ${toggle ? "hidden" : "col-span-1 h-screen"} `}>
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
            } flex gap-8 items-center z-20 bg-black p-2`}
          >
            {currentCover && (
              <img
                src={currentCover}
                alt="Current Cover"
                className="mt-2 rounded-lg"
                style={{ width: "50px", height: "50px", objectFit: "cover" }} // Adjust size as needed
              />
            )}
            <div>
              {currentTitle && (
                <p className="text-white text-[10px] mt-2">{currentTitle}</p>
              )}
              <audio
                className="w-[100%] mt-4" // Make the audio player full width
                src={currentAudio}
                autoPlay={currentAudio !== null}
                controls
              />
            </div>
          </div>

          <div className="p-2 md:ml-4 mt-[5rem] h-[80vh] overflow-y-auto">
            <Recent onPlayMusic={handlePlayMusic} />
            <Top />
            <Developers />
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
