import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "../Firebase/ultil";
import { getDownloadURL, ref } from "firebase/storage";
import { parseBuffer } from "music-metadata-browser"; // Import the function

function Recent() {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const musicCollection = collection(firestore, "music");
        const musicSnapshot = await getDocs(musicCollection);

        if (musicSnapshot.empty) {
          console.log("No music documents found.");
          setLoading(false);
          return;
        }

        const musicData = await Promise.all(
          musicSnapshot.docs.map(async (doc) => {
            const data = { id: doc.id, ...doc.data() };
            const musicRef = ref(storage, `music/${data.id}`);

            // Get the download URL for the audio file
            try {
              const url = await getDownloadURL(musicRef);
              return { ...data, downloadURL: url }; // Return data with download URL
            } catch (urlError) {
              console.error("Error fetching download URL:", urlError);
              return { ...data, downloadURL: null }; // Return data with null URL if error
            }
          })
        );

        // Enrich the music data using the new function
        const enrichedMusicData = await enrichMusicData(musicData);
        setMusicList(enrichedMusicData); // Update the state with enriched data
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  // Function to enrich music data
  const enrichMusicData = async (musicData) => {
    return await Promise.all(
      musicData.map(async (music) => {
        if (!music.downloadURL) {
          console.log("No download URL for music:", music);
          return music; // Skip if no URL
        }

        try {
          // Fetch audio file as an ArrayBuffer
          const response = await fetch(music.downloadURL);
          const arrayBuffer = await response.arrayBuffer();
          console.log("ArrayBuffer fetched:", arrayBuffer);

          // Extract metadata from the audio file
          const metadata = await parseBuffer(arrayBuffer);
          console.log("Metadata extracted:", metadata);

          const coverImage =
            metadata.common.picture && metadata.common.picture.length > 0
              ? URL.createObjectURL(new Blob([metadata.common.picture[0].data]))
              : null;

          return {
            ...music,
            title: metadata.common.title || "Unknown Title", // Set title to "Unknown Title" if not found
            artist: metadata.common.artist || "Unknown Artist", // Set artist to "Unknown Artist" if not found
            coverImage: coverImage, // Store the extracted cover image here
          };
        } catch (error) {
          console.error("Error fetching metadata:", error, music);
          return music; // Return original music data if error occurs
        }
      })
    );
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-white text-[18px] md:text-3xl">
          Recently uploaded
        </h1>
      </div>
      <div>
        <main className="flex space-x-4 overflow-x-auto scrollbar overflow-y-hidden py-4">
          {musicList.map((music) => (
            <article key={music.id} className="mt-4 flex-shrink-0 w-[150px]">
              {music.coverImage && (
                <img
                  src={music.coverImage} // Use the extracted cover image directly
                  alt={music.title || "Cover Image"} // Use title or a generic alt text
                  className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
                />
              )}
              <div className="text mt-4 ml-4">
                <p className="text-white text-xl font-bold">{music.title}</p>
                <p className="text-white text-[10px] md:text-[15px]">
                  Uploaded by {music.username}
                </p>
                <p className="text-white text-[10px] md:text-[15px]">
                  {music.timestamp?.toDate().toLocaleString() || "Unknown Date"}
                </p>
                {music.downloadURL && (
                  <a
                    href={music.downloadURL}
                    className="text-blue-500 underline"
                  >
                    play
                  </a>
                )}
              </div>
            </article>
          ))}
        </main>
      </div>
    </>
  );
}

export default Recent;
