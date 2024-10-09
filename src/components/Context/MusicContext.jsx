import React, { createContext, useContext, useState } from "react";

// Create the Music Context
const MusicContext = createContext();

// Create a provider component
export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null); // This will hold the selected song

  const onPlayMusic = (downloadURL, coverImageUrl, title) => {
    setCurrentSong({ downloadURL, coverImageUrl, title });
  };

  return (
    <MusicContext.Provider value={{ currentSong, onPlayMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook to use the Music Context
export const useMusicContext = () => {
  return useContext(MusicContext);
};
