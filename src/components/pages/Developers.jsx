import React from "react";
import profileImage from "../../assets/image/melodia.jpg";
import daniel from "../../assets/image/daniel.jpg";
import melodia from "../../assets/image/lolo.jpg";
function Developers() {
  return (
    <>
      <div className="flex space-x-4 ml-[0.8rem] mt-4">
        <h1 className="text-white text-[18px] md:text-3xl">Developers</h1>
      </div>
      <footer className="flex  overflow-x-auto scrollbar-hidden   p-4 wrapper text-white">
        <div className=" ml-4 items-center flex gap-3  ">
          <div className="w-[150px]">
            <img
              src={profileImage}
              alt="Profile of Leowave"
              className="w-[150px] h-[150px] rounded-full object-cover shadow-lg"
            />
          </div>
          <div className="text-center mt-4">
            <h4 className="text-2xl font-semibold mb-2">Leowave</h4>
            <h2 className="text-[15px] font-medium mb-4">Developer</h2>
            <button className="bg-green-500 text-black py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
              Contact
            </button>
          </div>
        </div>
        {/* Repeat the above div for additional profiles  md:w-full md:w-full*/}
        <div className=" ml-4 items-center flex gap-3">
          <div className="w-[150px] ">
            <img
              src={melodia}
              alt="Profile of Leowave"
              className="w-[150px] h-[150px] rounded-full object-cover  shadow-lg"
            />
          </div>
          <div className="text-center mt-4">
            <h4 className="text-2xl font-semibold mb-2">Swag</h4>
            <h2 className="text-[15px] font-medium mb-4">designer</h2>
            <button className="bg-green-500 text-black py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
              Contact
            </button>
          </div>
        </div>
        {/* Repeat the above div for additional profiles  md:w-full md:w-full*/}
        <div className=" ml-4 items-center flex gap-3">
          <div className="w-[150px]">
            <img
              src={daniel}
              alt="Profile of Leowave"
              className="w-[150px] h-[150px] rounded-full object-cover  shadow-lg"
            />
          </div>
          <div className="text-center mt-4">
            <h4 className="text-2xl font-semibold mb-2">Daniel</h4>
            <h2 className="text-[15px] font-medium mb-4">owner</h2>
            <button className="bg-green-500 text-black py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Developers;
