import React, { useState } from "react";
import PNg2 from "../../assets/image/pexels-samet-burak-daglioglu-574092183-27688828.jpg";
import pn3 from "../../assets/image/love.jpg";
import pn4 from "../../assets/image/premium_photo-1673306778968-5aab577a7365.jfif";
import pn6 from "../../assets/image/images (2).jfif";
import pn7 from "../../assets/image/images (1).jfif";

function Top() {
  return (
    <>
      <div className="mt-8 flex  space-x-4">
        <h1 className="text-white text-[18px] md:text-3xl">Top six</h1>
      </div>
      <main className="flex space-x-4 overflow-x-auto py-4">
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn7}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]   md:text-[15px] ">
              Uploaded by wave
            </p>
          </div>
        </article>
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn6}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]  md:text-[15px] ">
              Uploaded by wave
            </p>
          </div>
        </article>
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn6}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]   md:text-[15px] ">
              Uploaded by wave
            </p>
          </div>
        </article>
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn6}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]  ">
              Uploaded by wave
            </p>
          </div>
        </article>
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn6}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]  md:text-[15px] ">
              Uploaded by wave
            </p>
          </div>
        </article>
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn3}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]   md:text-[15px] ">
              Uploaded by wave
            </p>
          </div>
        </article>
        <article className="mt-4 flex-shrink-0 w-[150px]">
          <img
            src={pn4}
            alt="BY"
            className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
          />
          <div className="text mt-4 ml-4">
            <p className=" text-white text-xl font-bold">Alec Benja..</p>
            <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]  ">
              Uploaded by wave
            </p>
          </div>
        </article>
      </main>
    </>
  );
}

export default Top;
