import { Router } from "express";
import bookingRouters from "../modules/booking/booking.routes.js";
import masterRouters from "../modules/master/master.routes.js";
import hrRouters from "../modules/hr/hr.routes.js";
import usersroute from "../modules/users/users.routes.js";

const router = Router();

router.use(bookingRouters);
router.use(masterRouters);
router.use('/hr/', hrRouters);
router.use(usersroute)

export default router;
