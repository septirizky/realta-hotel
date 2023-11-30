import { Router } from "express";
import masterRouters from "../modules/master/master.routes.js";
import hrRouters from "../modules/hr/hr.routes.js";
import usersroute from "../modules/users/users.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import hotelRouters from "../modules/hotel/hotel.routes.js";
import restoRouters from "../modules/resto/resto.routes.js";
import bookingRouters from '../modules/booking/booking.routes.js';
import specialOfferRoutes from '../modules/booking/specialoffer/specialoffer.routes.js';
import bookingOrderRoutes from '../modules/booking/bookingorder/bookingorder.routes.js';

import purchaseRouters from "../modules/purchase/purchase.routes.js";
const router = Router();

router.use(bookingRouters);
router.use(specialOfferRoutes);
router.use(bookingOrderRoutes);
router.use(masterRouters);
router.use(hotelRouters);
router.use('/hr/', hrRouters);
router.use(usersroute)
router.use(paymentRoutes);
router.use(restoRouters)
router.use(purchaseRouters);

export default router;
