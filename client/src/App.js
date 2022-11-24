// import router from react
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/index";
import Dashboard from "./components/dashboard/index";

import isLoggedIn from "./components/helper/isLoggedIn";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={isLoggedIn() ? <Dashboard /> : <Auth />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
