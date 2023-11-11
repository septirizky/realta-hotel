import { Router } from "express";
import { addPaymentGateaway, createBank, deleteBank, deletePaymentGateaway, getAllBank, getBankId, getPaymentGateaway, getPaymentGateawayById, getUserAccount, payment, searchBank, searchPaymentGateaway, updateBank, updatePaymentGateaway } from "./payment.controller.js";


const paymentRoutes = Router();

paymentRoutes.get('/payment',payment);
paymentRoutes.get('/getAllBank',getAllBank);
paymentRoutes.post('/createBank',createBank);
paymentRoutes.get('/getBank/:id',getBankId);
paymentRoutes.post('/searchBank',searchBank);
paymentRoutes.put('/updateBank/:id',updateBank);
paymentRoutes.delete('/deleteBank/:id',deleteBank);


//=================== router fintech =====================

paymentRoutes.get('/getPaymentGateaway',getPaymentGateaway);
paymentRoutes.post('/addPaymentGateaway',addPaymentGateaway);
paymentRoutes.get('/getPaymentGateawayById/:id',getPaymentGateawayById);
paymentRoutes.put('/updatePaymentGateaway/:id',updatePaymentGateaway);
paymentRoutes.post('/searchPaymentGateaway',searchPaymentGateaway);
paymentRoutes.delete('/deletePaymentGateaway/:id',deletePaymentGateaway);


//=================== User Account =============================

paymentRoutes.get('/getUserAccount',getUserAccount);

export default paymentRoutes;