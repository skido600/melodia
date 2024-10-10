import { useState, useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { showError, showSuccess, showWarning } from "../helper/Toast";
import { db, auth, storage, firestore } from "../Firebase/ultil"; // Ensure firestore is imported
import jsmediatags from "jsmediatags";
import Nav from "./Nav";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, get } from "firebase/database";

function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const validTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/flac",
      "audio/aac",
      "audio/m4a",
      "audio/x-wav",
      "audio/x-aac",
      "audio/mp4",
      "audio/midi",
      "audio/x-midi",
      "audio/x-ms-wma",
      "audio/vnd.wav",
      "audio/webm",
      "audio/x-flac",
      "audio/x-ogg",
    ];

    if (!validTypes.includes(file.type)) {
      showWarning("Please select a valid music file (mp3 or wav)");
      return;
    }

    if (!user) {
      showWarning("User is not authenticated try relogin");
      return;
    }

    setIsUploading(true);

    try {
      let coverImage = "";
      let title = "Unknown Title";
      let artist = "Unknown Artist";
      let album = "Unknown Album";

      // Extract metadata using jsmediatags
      jsmediatags.read(file, {
        onSuccess: (tag) => {
          ({ title, artist, album } = tag.tags);
          console.log(title, artist, album);

          if (tag.tags.picture) {
            const { data, format } = tag.tags.picture;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            coverImage = `data:${format};base64,${window.btoa(base64String)}`;
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });

      // Upload the file to Firebase Cloud Storage
      const storagePath = storageRef(storage, `music/${user.uid}_${file.name}`); // Unique naming
      await uploadBytes(storagePath, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storagePath);

      // Fetch username from Realtime Database
      const userRef = dbRef(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      const username = userSnapshot.exists()
        ? userSnapshot.val().name
        : "Unknown User";

      // Prepare metadata for Firestore
      const musicData = {
        username: username,
        uid: user.uid,
        title: title,
        artist: artist,
        album: album,
        uploadLink: downloadURL,
        timestamp: serverTimestamp(),
        rank: 0,
        status: "public",
      };

      if (coverImage) {
        console.log(coverImage);
        const coverImageBlob = await fetch(coverImage).then((res) =>
          res.blob()
        );

        // Convert Blob to File
        const coverImageFile = new File(
          [coverImageBlob],
          `${title}_cover.${coverImage.split(";")[0].split("/")[1]}`,
          { type: coverImage.split(";")[0] }
        );

        const coverStoragePath = storageRef(
          storage,
          `coverImages/${user.uid}_${file.name.split(".")[0]}_cover.${
            coverImage.split(";")[0].split("/")[1]
          }`
        );
        await uploadBytes(coverStoragePath, coverImageFile); // Uploading the File instead of Blob
        const coverImageUrl = await getDownloadURL(coverStoragePath);

        // Add coverImageUrl to musicData
        musicData.coverImageUrl = coverImageUrl; // Store cover image URL in musicData
      }

      // Store metadata in Firestore
      const docRef = doc(firestore, "music", `${user.uid}_${file.name}`); // Using a unique document ID
      await setDoc(docRef, musicData);

      showSuccess("Music uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file or saving data:", error);
      showError(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="grid grid-cols-4 bg-black">
      <div className="col-span-1">
        <Nav />
      </div>
      <section className="col-span-3 ml-[1.4rem]">
        <section className="flex flex-col overflow-hidden gap-[20px] h-[100vh] mt-[0px] my-[10px]">
          <main>
            <div className="ml-[16px]">
              <div className="mt-[50px] md:w-[70%] mx-auto">
                <div className="flex cursor-pointer flex-col">
                  <h1 className="font-bold font-custom ml-[10px] text-white md:text-[1.5em]">
                    Upload Music:
                  </h1>
                  <div className="m-4">
                    <label
                      htmlFor="upload"
                      className="cursor-pointer mt-[20px]"
                    >
                      <input
                        type="file"
                        accept="audio/*"
                        id="upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="flex gap-3 overflow-hidden justify-between border-[2px] text-white border-white border-dashed text-[1.2em] font-bold rounded-[10px] p-[8px] w-full">
                        <h1 className="text-[12px]">Upload</h1>
                        <p className="text-[9px]">
                          {file ? file.name : "No file selected"}
                        </p>
                      </div>
                    </label>
                    <button
                      className="btn px-4 py-2 rounded-[10px] bg-none text-white bg-green-600 font-extrabold mt-[20px] w-full"
                      onClick={handleUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </section>
    </main>
  );
}

export default Upload;
