import { Router } from 'express';
import { helloBooking } from './booking.controllers.js';

const bookingRouters = Router();

bookingRouters.get('/booking/hello', helloBooking);

export default bookingRouters;
