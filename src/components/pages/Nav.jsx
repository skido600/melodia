import React from "react";
import { CiHome, CiSearch, CiUser, CiExport, CiLogin } from "react-icons/ci";
import melodia from "../../assets/image/lolo.jpg";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="fixed   text-white  md:bg-[#121212] w-[25%] top-0 bottom-0 p-5 flex flex-col justify-between">
      <div className="">
        <div
          onClick={() => handleNavigation("/")}
          className="md:flex items-start space-x-2 cursor-pointer"
        >
          <img
            src={melodia}
            alt="logo"
            className="md:w-16 h-[40px] w-[45px]  rounded-sm mb-4 object-cover"
          />
          <h2 className="hidden lg:block text-green-400 text-4xl font-bold">
            Melodia
          </h2>
        </div>
        <div className="flex flex-col space-y-4">
          <div
            className="md:flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <CiHome size={30} className="text-green-400 w-8 h-8" />
            <p className="hidden md:block  text-green-400 text-xl font-bold">
              Home
            </p>
          </div>
          <div className="md:flex items-center space-x-2 cursor-pointer">
            <CiSearch
              size={30}
              className="hover:text-green-400 text-[#D1D5DB]"
            />
            <p className="hidden text-[#D1D5DB] text-[20px]   font-bold md:block">
              Search
            </p>
          </div>
          <div
            onClick={() => handleNavigation("/user")}
            className="md:flex items-center space-x-2 cursor-pointer"
          >
            <CiUser
              size={30}
              className="hover:text-green-400 text-[#D1D5DB]s"
            />
            <p className="hidden font-bold text-[#D1D5DB] text-[20px] md:block">
              Profile
            </p>
          </div>
          <div
            className="md:flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/upload")}
          >
            <CiExport
              size={30}
              className="hover:text-green-400 font-thin text-[#D1D5DB]"
            />
            <p className="hidden text-[#D1D5DB] font-bold text-[20px]  md:block">
              Upload
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-2 items-center space-y-2">
        <Link to="login">
          <div className="md:flex items-center  space-x-2  cursor-pointer">
            <CiLogin
              size={30}
              className="hover:text-green-400 text-[#D1D5DB]"
            />
            <p className="hidden text-[#D1D5DB] text-[20px] font-bold md:block">
              Logout
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Nav;
