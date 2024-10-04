// src/utils/toastUtil.js
import { toast } from "react-hot-toast";

export const showWarning = (message) => {
  toast(message, {
    style: {
      background: "red", // Custom background color for warning
      color: "#e0de35", // Custom text color
    },
    duration: 5000, // Duration in milliseconds
  });
};

// You can also add other types of toasts (success, error, info) in the same file.
export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      background: "#28A745", // Custom background color for success (green)
      color: "#FFFFFF", // Custom text color (white)
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      background: "#DC3545", // Custom background color for error (red)
      color: "#FFFFFF", // Custom text color (white)
    },
  });
};
