import { Router } from "express";
import masterRouters from "../modules/master/master.routes.js";
import hotelRouters from "../modules/hotel/hotel.routes.js";

const router = Router();

router.use(masterRouters);
router.use(hotelRouters);

export default router;
