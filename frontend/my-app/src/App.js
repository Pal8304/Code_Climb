import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrapeProblem from "./components/scrape-problem";
import Dashboard from "./components/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/scrape-problem/:contestId/:index" element={<ScrapeProblem />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
