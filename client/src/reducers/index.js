import {combineReducers} from "redux";
import HrReducer from "./hrReducer";
import { paymentReducers } from "./paymentReducers";
export default combineReducers({
    // masukan reducer baru
    HrReducer, paymentReducers
})