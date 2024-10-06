import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "../Firebase/ultil";
import { getDownloadURL, ref } from "firebase/storage";

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

        setMusicList(musicData); // Update the state with music data
      } catch (error) {
        console.error("Error fetching music data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

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
              <div className="text mt-4 ml-4">
                <p className="text-white text-xl font-bold">Unknown Title</p>
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
