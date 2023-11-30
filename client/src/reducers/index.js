import {combineReducers} from "redux";
import HrReducer from "./hrReducer";
import masterReducer from "./masterReducer";

import {paymentReducers} from "./paymentReducers";
import { combineReducers } from "redux";
import HotelReducer from "./hotel";
import { combineReducers } from "redux";
import restoReducer from "./restoreducer";

import BookingHotelReducer from './bookingHotelReducer';

export default combineReducers({
    // masukan reducer baru
    HrReducer,
    masterReducer,
    paymentReducers,
    HotelReducer,
    restoReducer,
    BookingHotelReducer,
})