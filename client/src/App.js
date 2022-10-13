import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";

import IndexPage from "./components/LoginRegisterComps/IndexPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
