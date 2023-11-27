import { combineReducers } from "redux";
import HrReducer from "./hrReducer";
import PurchaseReducer from "./purchaseReducer";
import handleCart from "./purchase";

export default combineReducers({
  // masukan reducer baru
  HrReducer,
  PurchaseReducer,
  handleCart,
});
