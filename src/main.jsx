import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login.jsx";
// import Loginm from "./components/Loader/Loginm.jsx";
import Signin from "./components/Auth/Signin.jsx";
import NotFound from "./components/pages/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* <Route path="/" element={<Loginm />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/sign" element={<Signin />} />
        <Route path="/homepage/*" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
