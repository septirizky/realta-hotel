import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import { TempNav } from "./components/master/layout/tempNav";
import { Hr } from "./components/hr";
import Master from "./components/master";
import LocationsMaster from "./components/master/locations";
import Policy from "./components/master/policy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempNav />}>
          <Route index element={<Dashboard />} />
          <Route path="/hr" element={<Hr />} />
          <Route path="/master" element={<Master />} />
          <Route path="/master/locations" element={<LocationsMaster />} />
          <Route path="/master/policy" element={<Policy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
