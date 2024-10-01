import React from "react";
import png from "../../assets/image/lolo.jpg"; // Image import
import { Link } from "react-router-dom";

function HomesL() {
  return (
    <>
      <main className="bg-black h-screen">
        <section className="flex w-[80%] md:w-[32%] lg:w-[20%] m-auto justify-center items-center h-[100vh]">
          <main className="h-full flex flex-col justify-between items-center">
            {/* Centered logo */}
            <div className="flex justify-center mt-[8rem]">
              <img
                src={png}
                alt="logo"
                className="w-[30%] p-2 mb-4 bg-[#061417]"
              />
            </div>

            {/* Login/Signup buttons at the bottom */}
            <div className="w-full mb-8">
              <Link to="/login">
                <button className="bg-green-600 text-white rounded-full w-full py-2 mb-4">
                  Login
                </button>
              </Link>
              <Link to="/sign">
                <button className="border-2 w-full border-green-600 rounded-full text-white py-2">
                  Sign up
                </button>
              </Link>
            </div>
          </main>
        </section>
      </main>
    </>
  );
}

export default HomesL;
