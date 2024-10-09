import React, { useContext } from "react";
import Recent from "../components/pages/Recent";
import Top from "../components/pages/Top";
import { CgProfile } from "react-icons/cg";
import Nav from "./pages/Nav";
import Developers from "./pages/Developers";
import { ToggleContext } from "../components/Context/ToggleContext";

function Home() {
  const { toggle, HandleToggle } = useContext(ToggleContext);

  return (
    <main className="grid bg-black grid-cols-4">
      <div className={`${toggle ? "hidden" : "col-span-1 h-screen"}`}>
        <Nav />
      </div>

      <section
        className={`col-span-3 ${toggle && "col-span-4 h-screen ml-[1.4rem]"}`}
      >
        <nav
          className={`text-white fixed ${
            toggle ? "w-[95vw]" : "px-4 w-[75vw]"
          } flex justify-between z-20 bg-black p-2`}
        >
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

        <div className="p-2 md:ml-4 mt-[5rem] h-[80vh] overflow-y-auto">
          <Recent />
          <Top />
          <Developers />
        </div>
      </section>
    </main>
  );
}

export default Home;
