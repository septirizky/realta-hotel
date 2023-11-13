import { Router } from "express";
import bookingRouters from "../modules/booking/booking.routes.js";
import masterRouters from "../modules/master/master.routes.js";
import purchaseRouters from "../modules/purchase/purchase.routes.js";
const router = Router();

router.use(bookingRouters);
router.use(masterRouters);
router.use(purchaseRouters);

export default router;
