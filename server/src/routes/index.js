import { Router } from 'express';
import bookingRouters from '../modules/booking/booking.routes.js';
import masterRouters from '../modules/master/master.routes.js';
import specialOfferRoutes from '../modules/booking/specialoffer/specialoffer.routes.js';
import bookingOrderRoutes from '../modules/booking/bookingorder/bookingorder.routes.js';

const router = Router();

router.use(bookingRouters);
router.use(specialOfferRoutes);
router.use(bookingOrderRoutes);
router.use(masterRouters);

export default router;
