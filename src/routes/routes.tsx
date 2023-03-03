import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "../Components/autosync/onboarding";
import Activities from "../Pages/activities/activities";

import Home2 from "../Pages/home/home";
import Policies from "../Pages/policies/policies";

import SignIn from "../Pages/sign/signin";
import Stakeholders from "../Pages/stakeholders/stakeholders";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="/politica" element={<Policies />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/atividades" element={<Activities />} />
      </Routes>
    </BrowserRouter>
  );
};
