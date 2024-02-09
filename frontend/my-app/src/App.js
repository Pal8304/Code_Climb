import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ScrapeProblem from "./components/scrape_problem";
import Dashboard from "./components/Dashboard";
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
