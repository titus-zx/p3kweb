import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Timeline } from "./components/Timeline";
import { CandidateProfile } from "./components/CandidateProfile";
import { Funding } from "./components/Funding";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Timeline />
      <CandidateProfile />
      <Funding />
      <Footer />
    </div>
  );
}

export default App;
