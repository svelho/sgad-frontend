import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Pages/App/app";
import Header from "./Pages/Components/header/header";
import SignIn from "./Pages/SignIn/Signin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
