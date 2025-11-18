import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
