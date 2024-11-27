import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/authentification/SignIn";
import SignUp from "./pages/authentification/SignUp";
import Layout from "./layouts/Layout";
import DashboardPage from "./pages/admin/Dashboard";
import DentistesPage from "./pages/admin/Dentistes";
import UtilisateursPage from "./pages/admin/Utilisateurs";
import ComitesEvaluationPage from "./pages/admin/ComitesEvaluation";
import DepartementsPage from "./pages/admin/Departements";
import PublicLayout from "./layouts/PublicLayout";

import LandingPage from "./pages/dentiste/LandingPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes publiques */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          {/* Ajoutez d'autres routes publiques si nécessaire */}
        </Route>

        {/* Routes administratives avec le layout spécifique */}
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dentistes" element={<DentistesPage />} />
          <Route path="/admin/utilisateurs" element={<UtilisateursPage />} />
          <Route path="/admin/comites" element={<ComitesEvaluationPage />} />
          <Route path="/admin/departements" element={<DepartementsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
