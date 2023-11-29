import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
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
        <Route path="/" element={<TempNav />}>
          <Route index element={<Dashboard />} />
          <Route path="/hr" element={<Hr />} />
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
