import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "../Firebase/ultil";
import { getDownloadURL, ref } from "firebase/storage";
import logo from "../../assets/image/lolo.jpg";

function Recent({ onPlayMusic }) {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const musicCollection = collection(firestore, "music");
        const musicSnapshot = await getDocs(musicCollection);

        if (musicSnapshot.empty) {
          setError("No music documents found."); // Set error message
          setLoading(false);
          return;
        }

        const musicData = await Promise.all(
          musicSnapshot.docs.map(async (doc) => {
            const data = { id: doc.id, ...doc.data() };
            const musicRef = ref(storage, `music/${data.id}`);

            let downloadURL = null;
            try {
              downloadURL = await getDownloadURL(musicRef);
            } catch (urlError) {
              console.error("Error fetching download URL:", urlError);
            }

            let coverImageUrl = null;
            if (data.coverImageUrl) {
              const coverRef = ref(storage, data.coverImageUrl);
              try {
                coverImageUrl = await getDownloadURL(coverRef);
              } catch (coverError) {
                console.error("Error fetching cover image URL:", coverError);
              }
            }

            return {
              ...data,
              downloadURL: downloadURL,
              coverImageUrl: coverImageUrl || logo, // Default image directly
            };
          })
        );

        setMusicList(musicData);
      } catch (error) {
        console.error("Error fetching music data:", error);
        setError("Failed to fetch music data."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPlayMusic(
                    music.downloadURL,
                    music.coverImageUrl,
                    music.title
                  );
                }}
                className=""
              >
                <div className="text mt-4 ml-4">
                  <img
                    src={music.coverImageUrl}
                    alt={music.title || "Album Cover"}
                    className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
                  />
                  <p className="text-white text-xl font-bold">
                    {music.title && music.title.length > 7
                      ? `${music.title.substring(0, 7)}...`
                      : music.title || "Unknown Title"}
                  </p>
                  <p className="text-white text-[10px] ">
                    Uploaded by {music.username}
                  </p>
                  {/* <p className="text-white text-[10px] md:text-[15px]">
                    {music.timestamp?.toDate().toLocaleString() ||
                      "Unknown Date"}
                  </p> */}
                </div>
              </a>
            </article>
          ))}
        </main>
      </div>
    </>
  );
}

export default Recent;
