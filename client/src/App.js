import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import { TempNav } from "./components/master/layout/tempNav";
import Master from "./components/master";
import LocationsMaster from "./components/master/locations";
import Policy from "./components/master/policy";
import ServiceTask from "./components/master/servicetask";
import PriceItems from "./components/master/priceitems";
import CategoryGroup from "./components/master/categorygroup";
import Payment from "./components/payment/index";
import Bank from "./components/payment/bank/bank";
import PaymentGateaway from "./components/payment/paymentGateaway/paymentGateaway";
import Accounts from "./components/payment/accounts/accounts";
import TopUp from "./components/payment/topUp/topUp";
import Hotel from "./components/hotel/hotel";
import Facilities from "./components/hotel/facilities";
import {RestoNav} from "./components/resto/restoNav";
import Resto from "./components/resto/menu";
import ListHotel from './components/booking/ListHotel';
import BookingLayout from './components/booking/BookingLayout';
import HotelDetail from './components/booking/HotelDetail';
import BookingCreate from './components/booking/BookingCreate';
import BookingInvoice from './components/booking/BookingInvoice';
import {PurchaseLayout} from "./components/purchase/layout/sidebar";
import Vendor from "./components/purchase/vendor/vendor";
import AddVendorProduct from "./components/purchase/vendor/addVp";
import Stock from "./components/purchase/stock/stocks";
import PurchaseOrder from "./components/purchase/order/purchase";
import Products from "./components/purchase/order/gallery";
import StockDetail from "./components/purchase/stock/detailStock";
import Cart from "./components/purchase/order/cart";
import DetailOrder from "./components/purchase/order/detailorder";
import {Sidebar} from "primereact/sidebar";
import {HotelSidebar} from "./components/hotel/hotelSidebar";
import {WorkOrderDetail} from "./components/hr/WorkOrderDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' index element={<Dashboard/>}/>
                <Route path="/payment" element={<Payment/>}>
                    <Route index element={<Bank/>}/>
                    <Route path="/payment/paymentgateaway" index element={<PaymentGateaway/>}/>
                    <Route path="/payment/accounts" index element={<Accounts/>}/>
                    <Route path="/payment/top-up" index element={<TopUp/>}/>
                </Route>
                <Route path='/hr' element={<HrNav/>}>
                    <Route path='/hr/department' index element={<Department/>}/>
                    <Route path='/hr/employee' index element={<Employee/>}/>
                    <Route path='/hr/work-order' index element={<WorkOrder/>}/>
                    <Route path='/hr/work-order/:id' index element={<WorkOrderDetail/>}/>
                </Route>
                <Route path='/resto' element={<RestoNav/>}>
                    <Route path="/resto" index element={<Resto/>}/>
                </Route>
                <Route path="/" element={<NavbarComponent/>}>
                    <Route path="/profile" index element={<ProfilePage/>}/>
                </Route>
                <Route path="/signin" element={<SignupGuest/>}></Route>
                <Route path="/" element={<TempNav/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="/master" element={<Master/>}/>
                    <Route path="/master/locations" element={<LocationsMaster/>}/>
                    <Route path="/master/policy" element={<Policy/>}/>
                    <Route path="/master/seta" element={<ServiceTask/>}/>
                    <Route path="/master/priceitems" element={<PriceItems/>}/>
                    <Route path="/master/cagro" element={<CategoryGroup/>}/>
                </Route>
                <Route path="/hotel" element={<HotelSidebar/>}>
                    <Route index element={<Hotel/>}/>
                    <Route path="/hotel/facilities/:hotel_id" element={<Facilities/>}/>
                </Route>
                <Route path="/booking/hotel" element={<BookingLayout/>}>
                    <Route index element={<ListHotel/>}/>
                    <Route path=":id" element={<HotelDetail/>}/>
                    <Route path="create/:id" element={<BookingCreate/>}/>
                    <Route path="invoice/:id" element={<BookingInvoice/>}/>
                </Route>
                <Route path="/" element={<PurchaseLayout/>}>
                    <Route index element={<Products/>}/>
                    <Route path="/vendor" index element={<Vendor/>}/>
                    <Route
                        path="/vendor/:id/addproduct"
                        index
                        element={<AddVendorProduct/>}
                    />
                    <Route path="/cart" index element={<Cart/>}/>
                    <Route path="/stock" index element={<Stock/>}/>
                    <Route path="/stock/:id" index element={<StockDetail/>}/>
                    <Route path="/purchaseorder" index element={<PurchaseOrder/>}/>
                    <Route path="/detailorder/:id" index element={<DetailOrder/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
  return (
    <BrowserRouter>
      <Routes>
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
