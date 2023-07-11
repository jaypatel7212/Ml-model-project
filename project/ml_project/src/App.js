import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Registrationpage from "./components/Registrationpage";
import Dataset from "./components/Dataset";
import Code from "./components/Code.js";
import Model from "./components/Model.js";
import "./App.css";
import DashboardNavbar from "./components/DashboardNavbar";
import CreateDataset from "./components/CreateDataset";
import SingleDataset from "./components/SingleDataset";
import Profile from "./components/Profile";
import AllModel from "../src/components/AllModel";
import AllDataset from "../src/components/AllDataset";
import Compute1 from "./components/Compute1";

import Landing from "./pages/Landing";
import SingleModel from "./components/SingleModel";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Registrationpage />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/code" element={<Code />} />
          <Route path="/model" element={<Model />} />
          <Route path="/compute1" element={<Compute1 />} />

          <Route path="/dash-navbar" element={<DashboardNavbar />} />
          <Route path="/createdataset" element={<CreateDataset />} />
          <Route path="/singledataset" element={<SingleDataset />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/allmodel" element={<AllModel />} />
          <Route path="/alldataset" element={<AllDataset />} />
          <Route path="/singlemodel" element={<SingleModel />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
