import React from "react";
import Recent from "../components/pages/Recent";
import Top from "../components/pages/Top";
import { CgProfile } from "react-icons/cg";
// import Developers from "./";

function Home() {
  return (
    <>
      <main className="pt relative">
        <nav className="text-white  flex justify-between  m-auto z-20 bg-black p-2 ">
          <div className="flex gap-4">
            <button className="text-lg mb-2 border-green-600 border-b-4 rounded-md cursor-pointer focus:outline-none">
              Explore
            </button>
            <button className="text-lg cursor-pointer focus:outline-none">
              All
            </button>
          </div>
          {/* Profile Icon */}
          <CgProfile size={50} className="cursor-pointer" />
        </nav>

        {/* Page content */}
        <div className=" P-2">
          <Recent />
          <Top />
          {/* <Developers /> */}
        </div>
      </main>
    </>
  );
}

export default Home;
