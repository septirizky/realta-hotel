import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/dashboard";
import {HrNav} from "./components/hr/HrNav";
import {Department} from "./components/hr/Department";
import {Employee} from "./components/hr/Employee";
import {WorkOrder} from "./components/hr/WorkOrder";
import {NavbarComponent} from "./components/users/tempNav.js"
import ProfilePage from "./components/users/myProfile";
import SignupGuest from "./components/users/signupGuest";
import { TempNav } from "./components/master/layout/tempNav";
import Master from "./components/master";
import LocationsMaster from "./components/master/locations";
import Policy from "./components/master/policy";
import ServiceTask from "./components/master/servicetask";
import PriceItems from "./components/master/priceitems";
import CategoryGroup from "./components/master/categorygroup";

function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route path='/' index element={<Dashboard/>}/>
              <Route path='/hr' element={<HrNav/>}>
                  <Route path='/hr/department' index element={<Department/>}/>
                  <Route path='/hr/employee' index element={<Employee/>}/>
                  <Route path='/hr/work-order' index element={<WorkOrder/>}/>
              </Route>
              <Route path="/" element={<NavbarComponent />}>
                  <Route path="/vendor" index element={<ProfilePage />} />
              </Route>
              <Route path="/signin" element={<SignupGuest/>}></Route>
              <Route path="/" element={<TempNav />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/master" element={<Master />} />
                  <Route path="/master/locations" element={<LocationsMaster />} />
                  <Route path="/master/policy" element={<Policy />} />
                  <Route path="/master/seta" element={<ServiceTask />} />
                  <Route path="/master/priceitems" element={<PriceItems />} />
                  <Route path="/master/cagro" element={<CategoryGroup />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
