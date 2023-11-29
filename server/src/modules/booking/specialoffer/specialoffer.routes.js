import { Router } from 'express';
import {
  createSpecialOffer,
  deleteSpecialOffer,
  getAllSpecialOffer,
  getSpecialOfferActiveByName,
  getSpecialOfferById,
  helloSpof,
  updateSpecialOffer,
} from './specialoffer.controller.js';

const specialOfferRoutes = Router();

specialOfferRoutes.get('/booking/special-offer', getAllSpecialOffer);
specialOfferRoutes.post('/booking/special-offer', createSpecialOffer);
specialOfferRoutes.put('/booking/special-offer/:spofId', updateSpecialOffer);
specialOfferRoutes.get('/booking/special-offer/:spofId', getSpecialOfferById);
specialOfferRoutes.delete('/booking/special-offer/:spofId', deleteSpecialOffer);
specialOfferRoutes.get(
  '/booking/special-offer/check/:spofName',
  getSpecialOfferActiveByName
);

export default specialOfferRoutes;
