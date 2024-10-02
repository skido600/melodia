import React from "react";
import PNG from "../../assets/image/pexels-emre-simsek-27565013-27744211.jpg";
import PNg2 from "../../assets/image/pexels-samet-burak-daglioglu-574092183-27688828.jpg";
import pn6 from "../../assets/image/images (2).jfif";
function Recent() {
  return (
    <>
      <div className="flex space-x-4 ">
        <h1 className="text-white text-[18px] md:text-3xl">
          Recently uploaded
        </h1>
      </div>
      <div className="">
        <main className="flex space-x-4 overflow-x-auto scrollbar overflow-y-hidden py-4 ">
          <article className="mt-4 flex-shrink-0 w-[150px]">
            <img
              src={PNG}
              alt="BY"
              className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
            />
            <div className="text mt-4 ml-4">
              <p className="text-white text-xl font-bold">Alec Benja..</p>
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]">
                Uploaded by wave
              </p>
            </div>
          </article>
          <article className="mt-4 flex-shrink-0 w-[150px]">
            <img
              src={PNG}
              alt="BY"
              className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
            />
            <div className="text mt-4 ml-4">
              <p className="text-white text-xl font-bold">Alec Benja..</p>
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]">
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
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]">
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
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]">
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
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]">
                Uploaded by wave
              </p>
            </div>
          </article>
          <article className="mt-4 flex-shrink-0 w-[150px]">
            <img
              src={PNG}
              alt="BY"
              className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
            />
            <div className="text mt-4 ml-4">
              <p className="text-white text-xl font-bold">Alec Benja..</p>
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px] ">
                Uploaded by wave
              </p>
            </div>
          </article>
          <article className="mt-4 flex-shrink-0 w-[150px]">
            <img
              src={PNg2}
              alt="BY"
              className="w-full h-[20vh] md:h-[10rem] object-cover rounded-2xl"
            />
            <div className="text mt-4 ml-4">
              <p className="text-white text-xl font-bold">Alec Benja..</p>
              <p className="text-[#D1D5DB] text-[10px]  md:text-[15px]">
                Uploaded by wave
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}

export default Recent;
