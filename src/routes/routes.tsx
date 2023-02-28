import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home2 from "../Pages/Home/home";
import Policies from "../Pages/Policies/policies";

import SignIn from "../Pages/Sign/signin";
import Stakeholders from "../Pages/Stakeholders/stakeholders";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/politica" element={<Policies />} />
      </Routes>
    </BrowserRouter>
  );
};
