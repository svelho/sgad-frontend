import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "../Components/autosync/onboarding";
import Activities from "../pages/activities/activities";

import Home2 from "../pages/home/home";
import PlanningPage from "../pages/planning/planning";
import Policies from "../pages/policies/policies";
import Score from "../pages/score/score";
import SignIn from "../pages/sign/signin";
import Stakeholders from "../pages/stakeholders/stakeholders";

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
        <Route path="/planejamento" element={<PlanningPage />} />
        <Route path="/Score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  );
};
