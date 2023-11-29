import {
  GET_LIST_B_HOTEL_BY_ID,
  ADD_BOOKING,
  GET_BOOKING_DETAIL,
  GET_SPECIAL_OFFER,
  ADD_APPLY_COUPON,
  GET_LIST_B_PRICE_ITEMS,
  ADD_BOEX,
  UPDATE_BOOKING_ORDER,
} from '../actions/bookingHotelAction';

const initialState = {
  getDetailHotelResult: false,
  getDetailHotelLoading: false,
  getDetailHotelError: false,
  addBookingResult: false,
  addBookingLoading: false,
  addBookingError: false,
  getDetailBookingResult: false,
  getDetailBookingLoading: false,
  getDetailBookingError: false,
  getSpecialOfferResult: false,
  getSpecialOfferLoading: false,
  getSpecialOfferError: false,
  addApplyCouponResult: false,
  addApplyCouponLoading: false,
  addApplyCouponError: false,
  getListPriceItemsResult: false,
  getListPriceItemsLoading: false,
  getListPriceItemsError: false,
  addBoexResult: false,
  addBoexLoading: false,
  addBoexError: false,
  updateBookingOrderResult: false,
  updateBookingOrderLoading: false,
  updateBookingOrderError: false,
};

const BookingHotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_B_HOTEL_BY_ID:
      return {
        ...state,
        getDetailHotelResult: action.payload.data,
        getDetailHotelLoading: action.payload.loading,
        getDetailHotelError: action.payload.error,
      };
    case ADD_BOOKING:
      return {
        ...state,
        addBookingResult: action.payload.data,
        addBookingLoading: action.payload.loading,
        addBookingError: action.payload.error,
      };
    case GET_BOOKING_DETAIL:
      return {
        ...state,
        getDetailBookingResult: action.payload.data,
        getDetailBookingLoading: action.payload.loading,
        getDetailBookingError: action.payload.error,
      };
    case GET_SPECIAL_OFFER:
      return {
        ...state,
        getSpecialOfferResult: action.payload.data,
        getSpecialOfferLoading: action.payload.loading,
        getSpecialOfferError: action.payload.error,
      };
    case ADD_APPLY_COUPON:
      return {
        ...state,
        addApplyCouponResult: action.payload.data,
        addApplyCouponLoading: action.payload.loading,
        addApplyCouponError: action.payload.error,
      };
    case GET_LIST_B_PRICE_ITEMS:
      return {
        ...state,
        getListPriceItemsResult: action.payload.data,
        getListPriceItemsLoading: action.payload.loading,
        getListPriceItemsError: action.payload.error,
      };
    case ADD_BOEX:
      return {
        ...state,
        addBoexResult: action.payload.data,
        addBoexLoading: action.payload.loading,
        addBoexError: action.payload.error,
      };
    case UPDATE_BOOKING_ORDER:
      return {
        ...state,
        updateBookingOrderResult: action.payload.data,
        updateBookingOrderLoading: action.payload.loading,
        updateBookingOrderError: action.payload.error,
      };
    default:
      return state;
  }
};

export default BookingHotelReducer;
