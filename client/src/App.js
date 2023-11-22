import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/dashboard";
import {TempNav} from "./components/tempNav";
import {Hr} from "./components/hr";
import Payment from "./components/payment/index";
import Bank from "./components/payment/bank/bank";
import PaymentGateaway from "./components/payment/paymentGateaway";

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
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
