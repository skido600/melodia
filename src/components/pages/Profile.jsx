import React, { useState, useEffect } from "react";
import defaultProfile from "../../assets/image/images (5).png";
import Nav from "./Nav";
import { auth, storage, firestore } from "../Firebase/ultil"; // Ensure correct Firebase imports
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { showError, showSuccess } from "../helper/Toast";

function Profile() {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);

      // Fetch the profile picture from Firestore when the component mounts
      const fetchProfilePicture = async () => {
        try {
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.profilePicture) {
              setProfileImage(userData.profilePicture); // Set the stored profile picture
            }
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
          showError("Failed to load profile picture.");
        }
      };

      fetchProfilePicture();
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      try {
        //  Upload image
        const storagePath = storageRef(
          storage,
          `profile_pics/${user.uid}_${file.name}`
        );
        await uploadBytes(storagePath, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storagePath);

        //  Update Firestore with the new profile picture URL
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            profilePicture: downloadURL,
          },
          { merge: true } // Merge to prevent overwriting
        );

        setProfileImage(downloadURL); // Update UI to reflect the uploaded image
        showSuccess("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        showError(`Error: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <main className="grid grid-cols-4 bg-black h-screen">
        <div className="col-span-1">
          <Nav />
        </div>

        <section className="col-span-3 ml-[1.4rem]">
          <main className="w-[60vw] md:w-[30vw] mt-2 m-auto">
            <div className="mb-2">
              {/* Profile image */}
              <label htmlFor="profileImage">
                <img
                  src={profileImage}
                  alt="user"
                  className="w-[150px] h-[150px] rounded-full object-cover cursor-pointer mx-auto"
                />
              </label>
              {/* Hidden file input for image upload */}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                disabled={isUploading} // Disable while uploading
              />
            </div>

            {/* <input
              type="text"
              className="bg-[#121212] w-full rounded-[9px] py-3 mb-2"
              placeholder="Name"
            />
            <input
              type="text"
              className="bg-[#121212] rounded-[9px] w-full py-3"
              placeholder="Email"
            /> */}
            <button
              className="w-full bg-green-500 py-3 mt-2 rounded-[9px]"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save"}
            </button>
            <button className="w-full bg-red-500 py-3 mt-2 md:text-[20px] rounded-[9px]">
              Delete my account
            </button>
          </main>
        </section>
      </main>
    </>
  );
}

export default Profile;
