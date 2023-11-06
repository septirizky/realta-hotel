import { Router } from 'express';
import bookingRouters from '../modules/booking/booking.routes.js';

const router = Router();

router.use(bookingRouters);

export default router;
