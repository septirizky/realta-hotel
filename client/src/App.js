import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
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
import {TempNav} from "./components/tempNav";
import {Hr} from "./components/hr";
import Payment from "./components/payment/index";
import Bank from "./components/payment/bank/bank";
import PaymentGateaway from "./components/payment/paymentGateaway/paymentGateaway";
import Accounts from "./components/payment/accounts/accounts";
import TopUp from "./components/payment/topUp/topUp";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/hotel/sidebar";
import { Dashboard } from "./components/dashboard";
import Hotel from "./components/hotel/hotel";
import Facilities from "./components/hotel/facilities";

import { RestoNav } from "./components/resto/restoNav";
import Resto from "./components/resto/menu";
// import {TempNav} from "./components/tempNav";
// import {Hr} from "./components/hr";


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/dashboard';
import { TempNav } from './components/tempNav';
import { Hr } from './components/hr';
import ListHotel from './components/booking/ListHotel';
import BookingLayout from './components/booking/BookingLayout';
import HotelDetail from './components/booking/HotelDetail';
import BookingCreate from './components/booking/BookingCreate';
import BookingInvoice from './components/booking/BookingInvoice';

function App() {
    return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<TempNav/>}>
                  <Route index element={<Dashboard/>}/>
                  <Route path='/hr' element={<Hr/>}/>
                  <Route path="/payment" element={<Payment/>}>
                        <Route index element={<Bank/>}/>
                        <Route path="/payment/paymentgateaway"index element={<PaymentGateaway/>}/>
                        <Route path="/payment/accounts"index element={<Accounts/>}/>
                        <Route path="/payment/top-up"index element={<TopUp/>}/>
                  </Route>
              <Route path='/' index element={<Dashboard/>}/>
              <Route path='/hr' element={<HrNav/>}>
                  <Route path='/hr/department' index element={<Department/>}/>
                  <Route path='/hr/employee' index element={<Employee/>}/>
                  <Route path='/hr/work-order' index element={<WorkOrder/>}/>
                <Route path="/" index element={<Dashboard/>}/>
              <Route path='/resto' element={<RestoNav/>}>
                  <Route path="/resto" index element={<Resto/>} />
                  {/* <Route path='/resto/menu' element={<Menu/>}/> */}

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
                  <Route path="/" index element={<Dashboard />} />
                  <Route path="/hotel" element={<Sidebar />}>
                      <Route index element={<Hotel />} />
                      <Route path="/hotel/facilities/:hotel_id" element={<Facilities />} />
                  </Route>
                  <Route path="/booking/hotel" element={<BookingLayout />}>
                      <Route index element={<ListHotel />} />
                      <Route path=":id" element={<HotelDetail />} />
                      <Route path="create/:id" element={<BookingCreate />} />
                      <Route path="invoice/:id" element={<BookingInvoice />} />
                  </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
