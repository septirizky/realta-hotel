import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/dashboard";
import {HrNav} from "./components/hr/HrNav";
import {Department, Hr} from "./components/hr/Department";
import {Employee} from "./components/hr/Employee";
import {WorkOrder} from "./components/hr/WorkOrder";
import {NavbarComponent} from "./components/users/tempNav.js"
import { Footer } from "./components/users/tempFoot.js";

import Vendor from "./components/users/tempDash.js"
import SignupEmployee from "./components/users/signupEmployee.js"
import SigninEmployee from "./components/users/signin.js";
import SignupGuest from "./components/users/signupGuest.js";
import LoginGuest from "./components/users/loginGuest.js";
import ProfilePage from "./components/users/myProfile.js";
import TempDash from "./components/users/tempDash.js";


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
              <Route path="/Home" element={<TempDash/>}></Route>
              <Route path="/" element={<NavbarComponent />}>
                  <Route path="/vendor" index element={<ProfilePage />} />
              </Route>
              <Route path="/signin" element={<SignupGuest/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
