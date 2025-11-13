import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import MainApp from "./MainApp.jsx"; // przenieś tam kod swojej aplikacji

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/pomocnik_obywatela" element={<LandingPage />} />
        <Route path="/pomocnik_obywatela/app" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
