import { Router } from "express";
import bookingRouters from "../modules/booking/booking.routes.js";
import masterRouters from "../modules/master/master.routes.js";
import restoRouters from "../modules/resto/resto.routes.js"

const router = Router();

router.use(bookingRouters);
router.use(masterRouters);
router.use(restoRouters)

export default router;
