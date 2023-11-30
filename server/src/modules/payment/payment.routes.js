import { Router } from "express";
import { addPaymentGateaway, createBank, createUserAccount, deleteBank, deletePaymentGateaway, getAllBank, getBankId, getPaymentGateaway, getPaymentGateawayById, getTransaction, getTransactionDetail, getTransactionPagination, getTransactionSearch, getUserAccount, getUserAccountById, getUserAccountExclude, payment, searchBank, searchPaymentGateaway, testApi, topUp, updateBank, updatePaymentGateaway, updateUserAccount } from "./payment.controller.js";


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

paymentRoutes.get('/getUserAccount/',getUserAccount);
paymentRoutes.get('/getUserAccountById/:usac_user_id',getUserAccountById);
paymentRoutes.post('/addUserAccount', createUserAccount)
paymentRoutes.put('/updateUserAccount/:id',updateUserAccount)


//=================== Payment Transcation =============================

paymentRoutes.get('/getTransaction/',getTransaction);
paymentRoutes.get('/getTransactionPagination',getTransactionPagination);
paymentRoutes.get('/getTransactionDetail/:patr_id',getTransactionDetail)
paymentRoutes.post('/getTransactionSearch', getTransactionSearch)


//=================== Transfer =============================

paymentRoutes.get('/getUserAccountExclude/:usac_user_id',getUserAccountExclude)
paymentRoutes.post('/topUp/transfer/',topUp)
paymentRoutes.post('/testapi',testApi)

export default paymentRoutes;