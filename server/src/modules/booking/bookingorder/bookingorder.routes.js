import { Router } from 'express';
import {
  applyDiscount,
  createBookingOrder,
  createBookingOrderDetailExtra,
  deleteBookingOrderDetailExtra,
  getAllBookingDetailExtra,
  getAllBookingOrders,
  getAllHotel,
  getAllHotelById,
  getAllPriceItems,
  getBookingOrderById,
  updateBookingOrder,
} from './bookingorder.controller.js';
const bookingOrderRoutes = Router();

bookingOrderRoutes.get('/booking/booking-orders', getAllBookingOrders);
bookingOrderRoutes.post('/booking/booking-orders/create', createBookingOrder);
bookingOrderRoutes.put(
  '/booking/booking-orders/update/:id',
  updateBookingOrder
);
bookingOrderRoutes.post(
  '/booking/booking-orders/extra/create',
  createBookingOrderDetailExtra
);
bookingOrderRoutes.delete(
  '/booking/booking-orders/extra/delete/:boexId',
  deleteBookingOrderDetailExtra
);
// apply discount
bookingOrderRoutes.post(
  '/booking/booking-orders/apply-discount',
  applyDiscount
);

// booking detail
bookingOrderRoutes.get(
  '/booking/booking-orders/detail/:id',
  getBookingOrderById
);

// booking detail extra
bookingOrderRoutes.get(
  '/booking/booking-orders/extra',
  getAllBookingDetailExtra
);

// realtion
bookingOrderRoutes.get('/booking/hotel', getAllHotel);
bookingOrderRoutes.get('/booking/hotel/:id', getAllHotelById);
bookingOrderRoutes.get('/booking/price-items', getAllPriceItems);

export default bookingOrderRoutes;
