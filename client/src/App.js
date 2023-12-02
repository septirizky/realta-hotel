import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/hotel/sidebar";
import { Dashboard } from "./components/dashboard";
import Hotel from "./components/hotel/hotel";
import Facilities from "./components/hotel/facilities";
import FacilityHistory from "./components/hotel/facilityHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        <Route path="/hotel" element={<Sidebar />}>
          <Route index element={<Hotel />} />
          <Route path="/hotel/facilities/:hotel_id" element={<Facilities />} />
          <Route path="/hotel/facility_history" element={<FacilityHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
