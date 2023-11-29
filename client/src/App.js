import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PurchaseLayout } from "./components/purchase/layout/sidebar";
import Vendor from "./components/purchase/vendor/vendor";
import AddVendorProduct from "./components/purchase/vendor/addVp";
import Stock from "./components/purchase/stock/stocks";
import PurchaseOrder from "./components/purchase/order/purchase";
import Products from "./components/purchase/order/gallery";
import StockDetail from "./components/purchase/stock/detailStock";
import Cart from "./components/purchase/order/cart";
import DetailOrder from "./components/purchase/order/detailorder";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PurchaseLayout />}>
          <Route index element={<Products />} />
          <Route path="/vendor" index element={<Vendor />} />
          <Route
            path="/vendor/:id/addproduct"
            index
            element={<AddVendorProduct />}
          />
          <Route path="/cart" index element={<Cart />} />
          <Route path="/stock" index element={<Stock />} />
          <Route path="/stock/:id" index element={<StockDetail />} />
          <Route path="/purchaseorder" index element={<PurchaseOrder />} />
          <Route path="/detailorder/:id" index element={<DetailOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
