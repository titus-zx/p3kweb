import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { CommitteeStructure } from "./components/CommitteeStructure";
import { CandidateProfile } from "./components/CandidateProfile";
import { Funding } from "./components/Funding";
import { JanjiImanPage } from "./components/JanjiIman";
import { Footer } from "./components/Footer";

// Scroll to hash component
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return null;
};

// Home Page Component
const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Timeline />
      <CommitteeStructure />
      <CandidateProfile />
      <Funding />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/janji-iman" element={<JanjiImanPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
