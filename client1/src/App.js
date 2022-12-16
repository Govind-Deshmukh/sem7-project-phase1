import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

// helper functions and components
import Auth from "./components/auth/index";
import isLogged from "./components/helper/isLogged";

// dashboard components
// lazy loading components
// const Dashboard = React.lazy(() => import("./components/dashboard/index"));
// const Profile = React.lazy(() => import("./components/dashboard/profile"));
// const Segments = React.lazy(() => import("./components/dashboard/segments"));
// const SmtpConfig = React.lazy(() => import("./components/dashboard/smtp"));
import Dashboard from "./components/dashboard/index";
import Profile from "./components/dashboard/profile";
import Segments from "./components/dashboard/segments";
import SmtpConfig from "./components/dashboard/smtp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
        <Routes>
          <Route
            path="/dashboard"
            element={isLogged() ? <Dashboard /> : <Auth />}
          />
        </Routes>
        <Routes>
          <Route
            path="/dashboard/profile"
            element={isLogged() ? <Profile /> : <Auth />}
          />
        </Routes>
        <Routes>
          <Route
            path="/dashboard/segments"
            element={isLogged() ? <Segments /> : <Auth />}
          />
        </Routes>
        <Routes>
          <Route
            path="/dashboard/smtpconfig"
            element={isLogged() ? <SmtpConfig /> : <Auth />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
