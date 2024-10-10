import React, { useState } from "react";
import png from "../../assets/image/lolo.jpg";
import { FaEye, FaEnvelope } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { PiLockKeyBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../Validate/validate";
import { auth } from "../Firebase/ultil";
import { signInWithEmailAndPassword } from "firebase/auth";
import Rolling from "../Loader/Rolling"; // Import your loader component
import toast from "react-hot-toast";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const isValid = validateLogin(email, password, setError);

    if (isValid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (user.emailVerified) {
          localStorage.setItem("account_active", "true");
          toast.success("Logged in successfully");
          navigate("/homepage/");
        } else {
          <div>Please verify your email before logging in</div>;
          toast.error("Please verify your email before logging in.");
        }
        console.log("Form submitted successfully!");
      } catch (error) {
        let errorMessage = "Error logging in";

        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found";
            break;
          case "auth/network-request-failed":
            errorMessage = "opps check your internet connection nd try again";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password";
            break;
          default:
            errorMessage = "An unexpected error occurred";
        }

        toast.error(errorMessage);
        console.error("Error logging in:", error);
      } finally {
        setLoader(false);
      }
    } else {
      toast.error("Please fill in all fields correctly");
      setLoader(false);
    }
  };

  return (
    <main className="bg-black min-h-screen flex justify-center items-center">
      <section className="w-[80%]   lg:w-[26%] lg:mt-[6.4rem]  mt-[4rem]  m-auto">
        <main className="text-white">
          <img src={png} className="w-[20%] p-2 mb-2 bg-[#061417]" alt="logo" />
          <h1 className="text-white text-[1.5rem] font-semibold">
            welcome Back
          </h1>
          <div>
            <p>Hello wecome to melodia</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <label className="font-sans text-[15px]" htmlFor="email">
                Email
              </label>
              <input
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                id="email"
                className="w-full text-white rounded-lg h-10 bg-black border-2 border-[#0C1A21] focus:outline-none pl-8 pr-4"
                placeholder="example@example.com"
              />
              <FaEnvelope className="relative text-gray-400 top-[-1.7rem] ml-2 bg-black" />
              {error.email && (
                <p className="text-red-500 text-[12px]">{error.email}</p>
              )}
            </div>
            <div>
              <label className="font-sans text-[15px]" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full text-white rounded-lg h-10 bg-black border-2 border-[#0C1A21] focus:outline-none pl-8 pr-4"
                  placeholder="password"
                />
                <PiLockKeyBold className="absolute text-gray-400 top-[0.9rem] left-2 bg-black" />
                <div
                  className="absolute text-gray-400 top-[0.9rem] right-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <IoEyeOff />}
                </div>
                {error.password && (
                  <p className="text-red-500 text-[12px]">{error.password}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 check" />
                <span className="text-[13px]">Remember me</span>
              </label>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-600 rounded-full text-white w-full py-2 text-[15px]"
              >
                {loader ? <Rolling /> : "Login in"}
              </button>
            </div>

            <div>
              <p>
                Don't have an account?{" "}
                <Link to="/sign" className="text-blue-600 text-[15px]">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </main>
      </section>
    </main>
  );
}

export default Login;
