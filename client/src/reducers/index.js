import { combineReducers } from 'redux';
import HrReducer from './hrReducer';
import BookingHotelReducer from './bookingHotelReducer';

export default combineReducers({
  // masukan reducer baru
  HrReducer,
  BookingHotelReducer,
});
