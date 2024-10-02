import React, { useState } from "react";
import defaultProfile from "../../assets/image/images (5).png";
import Nav from "./Nav";

function Profile() {
  const [profileImage, setProfileImage] = useState(defaultProfile);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      setProfileImage(imageUrl);
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
              />
            </div>
            <input
              type="text"
              className="bg-[#121212] w-full rounded-[9px] py-3 mb-2"
            />
            <input
              type="text"
              className="bg-[#121212] rounded-[9px] w-full py-3"
            />
            <button className="w-full bg-green-500 py-3 mt-2 rounded-[9px]">
              Save
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
