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
        <Route path="/Purchase" element={<PurchaseLayout />}>
          <Route index element={<Products />} />
          <Route path="/Purchase/vendor" index element={<Vendor />} />
          <Route
            path="/Purchase/vendor/:id/addproduct"
            index
            element={<AddVendorProduct />}
          />
          <Route path="/Purchase/cart" index element={<Cart />} />
          <Route path="/Purchase/stock" index element={<Stock />} />
          <Route path="/Purchase/stock/:id" index element={<StockDetail />} />
          <Route
            path="/Purchase/purchaseorder"
            index
            element={<PurchaseOrder />}
          />
          <Route
            path="/Purchase/detailorder/:id"
            index
            element={<DetailOrder />}
          />
          <Route path="/Purchase/gallery" index element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
