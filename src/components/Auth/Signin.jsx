import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/lolo.jpg";
import { CiWavePulse1, CiUser } from "react-icons/ci";
import { FaEye, FaEnvelope } from "react-icons/fa";
import { PiLockKeyBold } from "react-icons/pi";
import { IoEyeOff } from "react-icons/io5";
import { validate } from "../Validate/validate";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../Firebase/ultil";
import { ref, set } from "firebase/database";
import toast from "react-hot-toast";
import Rolling from "../Loader/Rolling";
const errorMap = {
  "auth/invalid-email": "The email address is badly formatted.",
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password.",
  "auth/user-disabled":
    "Your account has been disabled. Please contact support for assistance.",
  "auth/operation-not-allowed":
    "Operation not allowed. Please contact support.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Please log in again and try.",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email address but different sign-in credentials.",
  "auth/credential-already-in-use":
    "The credential is already associated with a different user account.",
  "auth/popup-closed-by-user":
    "The popup was closed by the user before completing the sign-in.",
  "auth/popup-blocked":
    "The popup was blocked by the browser. Please allow popups and try again.",
  "auth/too-many-requests": "Too many requests. Please try again later.",
};
function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(email, password, name, setErrors);
    setLoader(true);
    if (isValid) {
      console.log("Form submitted successfully!");
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await sendEmailVerification(user);
        toast.success(
          "User created successfully. Please log in after verifying your email."
        );
      } catch (error) {
        const errorMessage =
          errorMap[error.code] ||
          "Error signing up. Check your internet connection.";
        toast.error(errorMessage);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <>
      <main className="bg-black min-h-screen flex justify-center items-center">
        <section className="w-[80%] h-[80vh] md:w-[32%] lg:w-[20%] mt-[4rem] m-auto">
          <main className="text-white">
            <img
              src={logo}
              className="w-[20%] p-2 mb-4 bg-[#061417]"
              alt="logo"
            />
            <h1 className="text-white text-[1.5rem] font-semibold">
              Register TO Melodia
            </h1>
            <div>
              <p className="mt-2">Play your favorite songs</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label className="font-sans text-[15px]" htmlFor="nickname">
                  Nickname
                </label>
                <input
                  name="nickname"
                  type="text"
                  id="nickname"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-white rounded-lg h-10 bg-black border-2 border-[#0C1A21] focus:outline-none pl-8 pr-4"
                  placeholder="john"
                />
                <CiUser className="relative text-gray-400 top-[-1.7rem] ml-2 bg-black" />
                {errors.name && (
                  <p className="text-red-500 text-[12px]">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="font-sans text-[15px]" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  id="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-white rounded-lg h-10 bg-black border-2 border-[#0C1A21] focus:outline-none pl-8 pr-4"
                  placeholder="example@example.com"
                />
                <FaEnvelope className="relative text-gray-400 top-[-1.7rem] ml-2 bg-black" />
                {errors.email && (
                  <p className="text-red-500 text-[12px]">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="font-sans text-[15px]" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-white rounded-lg h-10 bg-black border-2 border-[#0C1A21] focus:outline-none pl-8 pr-4"
                    placeholder="password"
                  />
                  <PiLockKeyBold className="absolute text-gray-400 top-[0.9rem] left-2 bg-black" />
                  <div
                    className="absolute text-gray-400 top-[0.9rem] right-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <IoEyeOff />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[12px]">{errors.password}</p>
                )}
              </div>

              <div className="mt-4 flex items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 check" />
                  <span className="text-[13px]">I agree to the</span>
                  <span className="text-blue-600 text-[13px] ml-1">
                    Terms & conditions
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-600 rounded-full text-white w-full py-2 text-[15px]"
                >
                  sign up
                </button>
              </div>

              <div>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 text-[15px]">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </main>
        </section>
      </main>
    </>
  );
}

export default Signin;
