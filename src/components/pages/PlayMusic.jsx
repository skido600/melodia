import React, { useState, useRef, useEffect, useContext } from "react";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { BiSkipNext } from "react-icons/bi";
import { useMusicContext } from "../Context/MusicContext";
import melodia from "../../assets/image/lolo.jpg";
import { ToggleContext } from "../Context/ToggleContext"; // Import the ToggleContext
const PlayMusic = () => {
  const { toggle } = useContext(ToggleContext);
  const { currentSong, isPlaying, setIsPlaying } = useMusicContext(); // Access the current song and play state
  const audioRef = useRef(null);

  // Handle play/pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  return (
    <>
      {currentSong && (
        <div
          className={`text-white fixed bottom-0 ${
            toggle
              ? "w-[100vw]"
              : "w-[80vw] ml-[4.7rem] md:ml-[12rem] lg:ml-[18rem]"
          } flex gap-8 items-center bg-[#121212] z-20 p-2`}
        >
          <main className="m-auto flex gap-2">
            <img
              src={currentSong.coverImageUrl || melodia}
              alt="Current Cover"
              className="mt-2 rounded-lg"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div className="flex flex-col gap justify-center items-center">
              <p className="text-white text-[10px] mt-2">{currentSong.title}</p>
              <div className="flex mt-1 items-center">
                <span
                  className="text-white text-[24px] cursor-pointer"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <CiPause1 /> : <CiPlay1 />}
                </span>
                <span className="text-white text-[24px] cursor-pointer">
                  <BiSkipNext />
                </span>
              </div>
            </div>

            {/* Audio element */}
            {currentSong.downloadURL && (
              <audio ref={audioRef} src={currentSong.downloadURL} />
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default PlayMusic;
