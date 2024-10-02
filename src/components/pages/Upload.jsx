import React from "react";
import Nav from "./Nav";

function Upload() {
  return (
    <>
      <main className="grid grid-cols-4">
        <div className="col-span-1">
          <Nav />
        </div>

        <section className="col-span-3 ml-[1.4rem]">
          <section className="flex flex-col overflow-hidden gap-[20px] h-[100vh] mt-[0px] my-[10px]">
            <main>
              <div className="ml-[16px]">
                <div
                  className="mt-[50px] md:w-[70%] mx-auto"
                  style={{ opacity: 1, transform: "none" }}
                >
                  <div className="flex cursor-pointer flex-col">
                    <h1 className="font-bold font-custom ml-[10px] text-white md:text-[1.5em]">
                      Upload Music:
                    </h1>
                    <div className="m-4">
                      <label
                        htmlFor="upload"
                        className="cursor-pointer mt-[20px]"
                      >
                        <input
                          type="file"
                          accept=".mp3"
                          id="upload"
                          className="hidden"
                          multiple
                        />
                        <div className=" flex justify-between border-[2px] text-white border-white border-dashed text-[1.2em] font-bold rounded-[10px] p-[8px] w-full">
                          <h1>Upload</h1>
                          <p>0</p>
                        </div>
                      </label>
                      <button className="btn px-4 py-2 rounded-[10px] bg-none text-white bg-green-600 font-extrabold mt-[20px] w-full ">
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </section>
      </main>
    </>
  );
}

export default Upload;
