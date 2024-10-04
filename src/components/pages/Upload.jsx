import React, { useState } from "react";
import Nav from "./Nav";
import { storage } from "../Firebase/ultil"; // Firebase config
import { ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { showError, showSuccess, showWarning } from "../helper/Toast";

function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file
    setFile(selectedFile); // Set the file in state
  };

  // Handle the file upload process
  const handleUpload = async () => {
    if (!file) return; // If no file is selected, return early

    // Additional check for file type
    const validTypes = ["audio/mpeg", "audio/wav"];
    if (!validTypes.includes(file.type)) {
      showWarning("Please select a valid music file (mp3 or wav)");
      return;
    }

    setIsUploading(true);

    const storageRef = ref(storage, `uploads/${file.name}`);

    // Upload the file to Firebase Storage
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded file successfully:", snapshot);
        showSuccess("Uploaded file successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        showError(`Error uploading file: ${error.message}`);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <>
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
                        onClick={handleUpload} // Handle the upload on button click
                        disabled={isUploading} // Disable button when uploading
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
    </>
  );
}

export default Upload;
