import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PurchaseLayout } from "./components/purchase/layout/sidebar";
import Vendor from "./components/purchase/vendor/vendor";
import AddVendorProduct from "./components/purchase/vendor/addVp";
import Stock from "./components/purchase/stock/stocks";
import PurchaseOrder from "./components/purchase/order/purchaseorder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PurchaseLayout />}>
          <Route path="/vendor" index element={<Vendor />} />
          <Route
            path="/vendor/:id/addproduct"
            index
            element={<AddVendorProduct />}
          />
          <Route path="/stock" index element={<Stock />} />
          <Route path="/purchaseorder" index element={<PurchaseOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
