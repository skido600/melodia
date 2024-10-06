import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "../Firebase/ultil";
import { getDownloadURL, ref } from "firebase/storage";
import Skeleton from "../Loader/Skeleton";

function Top() {
  const [topList, setTopList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null); // Create a ref for the audio element

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const topCollection = collection(firestore, "music");
        const topSnapshot = await getDocs(topCollection);

        if (topSnapshot.empty) {
          setError("No top items found or check your internet connection");
          setLoading(false);
          return;
        }

        const topData = await Promise.all(
          topSnapshot.docs.map(async (doc) => {
            const data = { id: doc.id, ...doc.data() };
            const topItemRef = ref(storage, `top/${data.id}`);

            let downloadURL = null;
            try {
              downloadURL = await getDownloadURL(topItemRef);
            } catch (urlError) {
              console.error(
                "Error fetching download URL for top item:",
                urlError
              );
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
              coverImageUrl: coverImageUrl || "default-image-path.jpg",
            };
          })
        );

        setTopList(topData);
      } catch (error) {
        console.error("Error fetching top items:", error);
        setError("Failed to fetch top items.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopItems();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <p className="text-blue-500">{error}</p>;
  }

  const filteredTopList = topList.filter(
    (item) => item.title && item.title.length <= 24
  );

  const handleItemClick = (item) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the currently playing audio if any
    }

    audioRef.current = new Audio(item.downloadURL);
    audioRef.current.play().catch((err) => {
      console.error("Error playing audio:", err);
    });
  };

  return (
    <>
      <audio ref={audioRef} controls style={{ display: "none" }} />
      <div className="mt-4 flex space-x-4">
        <h1 className="text-white text-[18px] md:text-3xl">Top six</h1>
      </div>
      <main className="flex space-x-4 overflow-x-auto py-4">
        {filteredTopList.length > 0 ? (
          filteredTopList.map((item) => (
            <article key={item.id} className="mt-4 flex-shrink-0 w-[150px]">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item);
                }}
              >
                <img
                  src={item.coverImageUrl}
                  alt={item.title || "Top Item"}
                  className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
                />
                <div className="text mt-4 ml-4">
                  <p className="text-white text-xl font-bold">
                    {item.title && item.title.length > 7
                      ? `${item.title.substring(0, 7)}...`
                      : item.title || "Unknown Title"}
                  </p>
                  <p className="text-[#D1D5DB] text-[10px] md:text-[15px]">
                    Uploaded by {item.username || "Unknown User"}
                  </p>
                </div>
              </a>
            </article>
          ))
        ) : (
          <p className="text-red-500">
            No music titles with 7 or fewer characters available.
          </p>
        )}
      </main>
    </>
  );
}

export default Top;
