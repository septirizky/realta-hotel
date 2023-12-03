import { Router } from 'express';
import {
  applyDiscount,
  createBookingOrder,
  createBookingOrderDetailExtra,
  createBookingPayment,
  deleteBookingOrderDetailExtra,
  getAllBookingDetailExtra,
  getAllBookingOrders,
  getAllHotel,
  getAllHotelById,
  getAllPriceItems,
  getBookingInvoice,
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

// create payment-transaction
bookingOrderRoutes.post(
  '/booking/payment',
  createBookingPayment
);

// get invoice (payment relation with booking orders)
bookingOrderRoutes.get(
  '/booking/invoice/:bookingOrderNumber',
  getBookingInvoice
);

// realtion
bookingOrderRoutes.get('/booking/hotel', getAllHotel);
bookingOrderRoutes.get('/booking/hotel/:id', getAllHotelById);
bookingOrderRoutes.get('/booking/price-items', getAllPriceItems);


export default bookingOrderRoutes;
