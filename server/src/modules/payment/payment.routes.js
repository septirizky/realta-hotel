import { Router } from "express";
import { payment } from "./payment.controller.js";


const paymentRoutes = Router();

paymentRoutes.get('/payment',payment)

export default paymentRoutes;