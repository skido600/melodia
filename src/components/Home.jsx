import React, { useState } from "react";
import Recent from "../components/pages/Recent";
import Top from "../components/pages/Top";
import { CgProfile } from "react-icons/cg";
import Nav from "./pages/Nav";
import Developers from "./pages/Developers";

function Home() {
  const [toggle, setToggle] = useState(false);
  const HandleToggle = () => {
    if (window.innerWidth < 730) {
      setToggle(!toggle);
    }
  };
  console.log(toggle);
  return (
    <>
      <main className="grid grid-cols-4">
        <div className={` ${toggle ? "hidden" : "col-span-1"} `}>
          <Nav />
        </div>

        <section className={`col-span-3 ${toggle && "col-span-4 m-2"}`}>
          <nav className="text-white  flex justify-between  z-20 bg-black p-2 ">
            <div className="flex gap-4">
              <button className="text-lg mb-2 border-green-600 border-b-4 rounded-md cursor-pointer focus:outline-none">
                Explore
              </button>
              <button className="text-lg cursor-pointer focus:outline-none">
                All
              </button>
            </div>

            <CgProfile
              size={50}
              className="cursor-pointer"
              onClick={HandleToggle}
            />
          </nav>

          <div className=" P-2">
            <Recent />
            <Top />
            <Developers />
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
