import { useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, get } from "firebase/database";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { showError, showSuccess, showWarning } from "../helper/Toast";
import { db, auth, storage } from "../Firebase/ultil"; // Adjust the path if necessary
import Nav from "./Nav";

function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const user = auth.currentUser; // Get the current user

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle the file upload process
  const handleUpload = async () => {
    if (!file) return;

    const validTypes = ["audio/mpeg", "audio/wav"];
    if (!validTypes.includes(file.type)) {
      showWarning("Please select a valid music file (mp3 or wav)");
      return;
    }

    if (!user) {
      showError("User is not authenticated");
      return;
    }

    setIsUploading(true);

    // Upload file to Firebase Storage
    const storageReference = storageRef(storage, `uploads/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      showSuccess("Uploaded file successfully");

      // Fetch username from Realtime Database
      const userRef = dbRef(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      const username = userSnapshot.exists()
        ? userSnapshot.val().name
        : "Unknown User";

      console.log(userSnapshot.val().name);
      // Add metadata to Firestore
      const musicData = {
        username: username,
        uid: user.uid,
        uploadLink: downloadURL,
        timestamp: serverTimestamp(),
        rank: 0, // Customize this logic as needed
        status: "uploaded",
      };

      console.log(musicData);
      // Store metadata in Firestore under 'AllMusics/musiccollection'
      const musicDocRef = doc(db, `AllMusics/musiccollection/${file.name}`);
      await setDoc(musicDocRef, musicData);

      showSuccess("Music metadata added to Firestore");
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
                        accept=".mp3, .wav"
                        id="upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="flex gap-3 justify-between border-[2px] text-white border-white border-dashed text-[1.2em] font-bold rounded-[10px] p-[8px] w-full">
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
