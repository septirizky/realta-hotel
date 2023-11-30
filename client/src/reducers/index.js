import {combineReducers} from "redux";
import HrReducer from "./hrReducer";
import masterReducer from "./masterReducer";

import {paymentReducers} from "./paymentReducers";

export default combineReducers({
    // masukan reducer baru
    HrReducer,
    masterReducer,
    paymentReducers
})