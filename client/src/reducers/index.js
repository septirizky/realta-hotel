import {combineReducers} from "redux";
import HrReducer from "./hrReducer";
import UsersReducer from "./usersReducers";


export default combineReducers({
    // masukan reducer baru
    HrReducer,
    UsersReducer
})