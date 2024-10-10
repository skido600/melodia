import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="bg-black text-white h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold">404 NOT FOUND</h1>
      <p className="mt-4 text-lg">
        Oops! The page you're looking for does not exist.
      </p>
      <Link
        to="/homepage/"
        className="mt-6 text-blue-500 hover:underline text-lg"
      >
        Go back to Home
      </Link>
    </main>
  );
}

export default NotFound;
