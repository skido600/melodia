import React from "react";

// CustomAlert Component
const CustomAlert = ({ title, message, onClose }) => {
  return (
    <div
      id="customAlertBox"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 hidden"
    >
      <div className="bg-white rounded-lg font-poppins font-[500] text-black p-8 w-4/5 md:w-1/2 lg:w-1/3 relative">
        <h2
          id="myAlertTitle"
          className="font-semibold text-2xl font-poppins text-center mb-4"
        >
          {title}
        </h2>
        <p id="myAlertText" className="text-sm text-center font-poppins mb-6">
          {message}
        </p>
        <button
          id="customAlertOk"
          className="w-full bg-[#061417] text-white py-2 rounded-lg font-bold hover:bg-gray-700"
          onClick={onClose}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

// Function to show the alert
export const showCustomAlert = (title, message) => {
  const alertBox = document.getElementById("customAlertBox");
  alertBox.querySelector("#myAlertTitle").textContent = title;
  alertBox.querySelector("#myAlertText").textContent = message;
  alertBox.classList.remove("hidden");
};

// Function to close the alert
export const closeCustomAlert = () => {
  const alertBox = document.getElementById("customAlertBox");
  alertBox.classList.add("hidden");
};

export default CustomAlert;
