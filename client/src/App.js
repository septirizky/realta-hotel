import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavbarComponent} from "./components/users/tempNav.js"
import { Footer } from "./components/dashboard/tempFoot.js";

import { LogRegUser } from "./components/users/LogRegUser.js";
import { LogRegGuest } from "./components/users/LogRegGuest.js";
import SignupEmployee from "./components/users/signupEmployee.js"
import SigninEmployee from "./components/users/loginemploye.js";
import SignupGuest from "./components/users/signupGuest.js";
import LoginGuest from "./components/users/loginGuest.js";
import ProfilePage from "./components/users/myProfile.js";
import { Dashboard } from "./components/dashboard/index.js";


function MainLayout() {
  return (
    <div>
      <Dashboard />
      <Footer />
    </div>
  );
}
function App() {
  
    return (
      <BrowserRouter>
      <Routes>
      <Route path="/Home" element={<MainLayout />} />
        <Route path="/" element={<NavbarComponent />}>
          <Route path="/user/Profile/" index element={<ProfilePage />} />
        </Route>
        <Route path="/signupguest" element={<SignupGuest/>}></Route>
        <Route path="/signemployee" element={<SigninEmployee/>}></Route>
        <Route path="/signin" element={<LoginGuest/>}></Route>
        <Route path="/signupemployee" element={<SignupEmployee/>}></Route>
        <Route path="/logreguser" element={<LogRegUser/>}></Route>
        <Route path="/logregguest" element={<LogRegGuest/>}></Route>
        
      </Routes>
    </BrowserRouter>
      );
    }

export default App;
