import { combineReducers } from "redux";
import HrReducer from "./hrReducer";
import masterReducer from "./masterReducer";
import {paymentReducers} from "./paymentReducers";
import HotelReducer from "./hotel";
import restoReducer from "./restoreducer";

import BookingHotelReducer from './bookingHotelReducer';
import PurchaseReducer from "./purchaseReducer";
import handleCart from "./cartpurchase";

export default combineReducers({
    // masukan reducer baru
    HrReducer,
    masterReducer,
    paymentReducers,
    HotelReducer,
    restoReducer,
    BookingHotelReducer,
    PurchaseReducer,
    handleCart,
})