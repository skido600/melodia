import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import melodia from "../../assets/image/lolo.jpg";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="fixed  bottom-0 md:p-8 p-5 gap-0 text-white z-10 md:bg-[#121212] w-[23%] md:w-[24%] h-screen flex flex-col justify-between">
      <div>
        <div
          onClick={() => handleNavigation("/")}
          className="flex items-start space-x-2 cursor-pointer"
        >
          <img
            src={melodia}
            alt="logo"
            className="md:w-16 w-[10rem]   rounded-sm mb-4 object-cover"
          />
          <h2 className="hidden lg:block text-green-400 text-4xl font-bold">
            Melodia
          </h2>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <FaHome size={30} className="text-green-400" />
            <p className="hidden md:block text-green-400 text-xl font-bold">
              Home
            </p>
          </div>
          <div
            onClick={() => handleNavigation("/search")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaSearch
              size={30}
              className="hover:text-green-400 cursor-pointer"
            />
            <p className="hidden md:font-bold md:block">Search</p>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <FiUser size={30} className="hover:text-green-400 cursor-pointer" />
            <p className="hidden  md:font-bold  md:block">Profile</p>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/upload")}
          >
            <MdOutlineFileUpload
              size={30}
              className="hover:text-green-400 cursor-pointer"
            />
            <p className="hidden  md:font-bold  md:block">Upload</p>
          </div>
        </div>
      </div>
      <div className="grid gap-2 items-center space-y-2">
        <div className="flex items-center space-x-2 cursor-pointer">
          <IoIosSettings
            size={30}
            className="hover:text-green-400 cursor-pointer"
          />
          <p className="hidden  md:font-bold  md:block">Settings</p>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <IoIosLogOut size={30} className="hover:text-green-400" />
          <p className="hidden  md:font-bold  md:block">Logout</p>
        </div>
      </div>
    </section>
  );
}

export default Nav;
