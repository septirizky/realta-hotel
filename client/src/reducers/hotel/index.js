import {
  GET_FACI,
  ADD_FACI,
  UPDATE_FACI,
  DELETE_FACI,
  GET_CATEGORY,
  ADD_PHOTO,
  GET_PHOTO,
  DELETE_PHOTO,
  GET_FACIHIS,
} from "../../actions/facilitiesAction";
import {
  GET_CITY,
  GET_HOTEL,
  ADD_HOTEL,
  UPDATE_HOTEL,
  DELETE_HOTEL,
} from "../../actions/hotelAction";

const initialState = {
  getCityResult: false,
  getCityLoading: false,
  getCityError: false,

  getHotelResult: false,
  getHotelLoading: false,
  getHotelError: false,

  addHotelResult: false,
  addHotelLoading: false,
  addHotelError: false,

  updateHotelResult: false,
  updateHotelLoading: false,
  updateHotelError: false,

  deleteHotelResult: false,
  deleteHotelLoading: false,
  deleteHotelError: false,

  getFaciResult: false,
  getFaciLoading: false,
  getFaciError: false,

  addFaciResult: false,
  addFaciLoading: false,
  addFaciError: false,

  updateFaciResult: false,
  updateFaciLoading: false,
  updateFaciError: false,

  deleteFaciResult: false,
  deleteFaciLoading: false,
  deleteFaciError: false,

  getCategoryResult: false,
  getCategoryLoading: false,
  getCategoryError: false,

  getPhotoResult: false,
  getPhotoLoading: false,
  getPhotoError: false,

  addPhotoResult: false,
  addPhotoLoading: false,
  addPhotoError: false,

  deletePhotoResult: false,
  deletePhotoLoading: false,
  deletePhotoError: false,

  getFaciHisResult: false,
  getFaciHisLoading: false,
  getFaciHisError: false,
};

const hotel = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITY:
      return {
        ...state,
        getCityResult: action.payload.data,
        getCityLoading: action.payload.loading,
        getCityError: action.payload.errorMessage,
      };

    case GET_HOTEL:
      return {
        ...state,
        getHotelResult: action.payload.data,
        getHotelLoading: action.payload.loading,
        getHotelError: action.payload.errorMessage,
      };

    case ADD_HOTEL:
      return {
        ...state,
        addHotelResult: action.payload.data,
        addHotelLoading: action.payload.loading,
        addHotelError: action.payload.errorMessage,
      };

    case UPDATE_HOTEL:
      return {
        ...state,
        updateHotelResult: action.payload.data,
        updateHotelLoading: action.payload.loading,
        updateHotelError: action.payload.errorMessage,
      };

    case DELETE_HOTEL:
      return {
        ...state,
        deleteHotelResult: action.payload.data,
        deleteHotelLoading: action.payload.loading,
        deleteHotelError: action.payload.errorMessage,
      };

    case GET_FACI:
      return {
        ...state,
        getFaciResult: action.payload.data,
        getFaciLoading: action.payload.loading,
        getFaciError: action.payload.errorMessage,
      };

    case ADD_FACI:
      return {
        ...state,
        addFaciResult: action.payload.data,
        addFaciLoading: action.payload.loading,
        addFaciError: action.payload.errorMessage,
      };

    case UPDATE_FACI:
      return {
        ...state,
        updateFaciResult: action.payload.data,
        updateFaciLoading: action.payload.loading,
        updateFaciError: action.payload.errorMessage,
      };

    case DELETE_FACI:
      return {
        ...state,
        deleteFaciResult: action.payload.data,
        deleteFaciLoading: action.payload.loading,
        deleteFaciError: action.payload.errorMessage,
      };

    case GET_CATEGORY:
      return {
        ...state,
        getCategoryResult: action.payload.data,
        getCategoryLoading: action.payload.loading,
        getCategoryError: action.payload.errorMessage,
      };

    case GET_PHOTO:
      return {
        ...state,
        getPhotoResult: action.payload.data,
        getPhotoLoading: action.payload.loading,
        getPhotoError: action.payload.errorMessage,
      };

    case ADD_PHOTO:
      return {
        ...state,
        addPhotoResult: action.payload.data,
        addPhotoLoading: action.payload.loading,
        addPhotoError: action.payload.errorMessage,
      };

    case DELETE_PHOTO:
      return {
        ...state,
        deletePhotoResult: action.payload.data,
        deletePhotoLoading: action.payload.loading,
        deletePhotoError: action.payload.errorMessage,
      };

    case GET_FACIHIS:
      return {
        ...state,
        getFaciHisResult: action.payload.data,
        getFaciHisLoading: action.payload.loading,
        getFaciHisError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default hotel;
