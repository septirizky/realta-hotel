import { Router } from "express";
import masterRouters from "../modules/master/master.routes.js";
import hrRouters from "../modules/hr/hr.routes.js";
import usersroute from "../modules/users/users.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import hotelRouters from "../modules/hotel/hotel.routes.js";
import restoRouters from "../modules/resto/resto.routes.js"

const router = Router();

router.use(masterRouters);
router.use(hotelRouters);
router.use('/hr/', hrRouters);
router.use(usersroute)
router.use(paymentRoutes);
router.use(restoRouters)

export default router;
