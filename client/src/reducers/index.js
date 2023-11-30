import {combineReducers} from "redux";
import HrReducer from "./hrReducer";
import masterReducer from "./masterReducer";

import {paymentReducers} from "./paymentReducers";
import { combineReducers } from "redux";
import HotelReducer from "./hotel";

export default combineReducers({
    // masukan reducer baru
    HrReducer,
    masterReducer,
    paymentReducers,
    HotelReducer,
})