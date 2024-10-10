import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayMusic = (downloadURL, coverImageUrl, title) => {
    setCurrentSong({ downloadURL, coverImageUrl, title });
    setIsPlaying(true); // Automatically start playing
  };

  const pauseMusic = () => {
    setIsPlaying(false);
  };

  const value = {
    currentSong,
    isPlaying,
    onPlayMusic,
    pauseMusic,
    setIsPlaying,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
