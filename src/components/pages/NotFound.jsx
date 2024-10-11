import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="bg-black text-white h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-xl font-bold">404 NOT FOUND</h1>
      <p className="mt-4 text-[10px]">
        Oops! The page you're looking for does not exist.
      </p>
    </main>
  );
}

export default NotFound;
