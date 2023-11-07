import { Router } from "express";
import bookingRouters from "../modules/booking/booking.routes.js";
import masterRouters from "../modules/master/master.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";

const router = Router();

router.use(bookingRouters);
router.use(masterRouters);
router.use(paymentRoutes);

export default router;
