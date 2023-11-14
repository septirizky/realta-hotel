import { combineReducers } from "redux";
import HrReducer from "./hrReducer";
import masterReducer from "./masterReducer";

export default combineReducers({
  // masukan reducer baru
  HrReducer,
  masterReducer,
});
