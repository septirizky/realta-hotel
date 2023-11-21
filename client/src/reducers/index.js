import { combineReducers } from "redux";
import HrReducer from "./hrReducer";
import PurchaseReducer from "./purchaseReducer";

export default combineReducers({
  // masukan reducer baru
  HrReducer,
  PurchaseReducer,
});
