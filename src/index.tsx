import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignIn from "./Pages/SignIn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>
);
