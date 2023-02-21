import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from "../Pages/Home/home";

import SignIn from "../Pages/SignIn/signin";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
  );
};
