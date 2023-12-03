/* eslint-disable no-unreachable */
import {
  GET_VENDOR,
  GET_STOCK,
  GET_ORDER,
  GET_VENDORSTOCK,
  GET_VENDORID,
  GET_STOCKDETAIL,
  GET_HOTEL,
  GET_PURCHASE,
  GET_GALLERY,
  DELETE_ORDER,
  ADDSTATUS_ORDER, GET_HOTELID
} from "../actions/purchaseAction";

const initialState = {
  getVendorResult: false,
  getVendorLoading: false,
  getVendorError: false,

  getVendorPResult: false,
  getVendorPLoading: false,
  getVendorPError: false,

  getVendorIDResult: false,
  getVendorIDLoading: false,
  getVendorIDError: false,

  getStockResult: false,
  getStockLoading: false,
  getStockError: false,

  getStockDetailResult: false,
  getStockDetailLoading: false,
  getStockDetailError: false,

  getOrderResult: false,
  getOrderLoading: false,
  getOrderError: false,

  deleteheaderResult: false,
  deleteheaderLoading: false,
  deleteheaderError: false,

  addstatusheaderResult: false,
  addstatusheaderLoading: false,
  addstatusheaderError: false,

  getPurchaseResult: false,
  getPurchaseLoading: false,
  getPurchaseError: false,

  getHotelResult: false,
  getHotelLoading: false,
  getHotelError: false,

  getHotelIdResult: false,
  getHotelIdLoading: false,
  getHotelIdError: false,

  getGalleryResult: false,
  getGallleryLoading: false,
  getGalleryError: false,
};

const PurchaseReducer = (state = initialState, action) => {
  const product = action.payload;
  console.log(product);
  switch (action.type) {
    case GET_VENDOR:
      return {
        ...state,
        getVendorResult: action.payload.data,
        getVendorLoading: action.payload.loading,
        getVendorError: action.payload.errorMessage,
      };
    case GET_VENDORSTOCK:
      return {
        ...state,
        getVendorPResult: action.payload.data,
        getVendorPLoading: action.payload.loading,
        getVendorPError: action.payload.errorMessage,
      };
    case GET_VENDORID:
      return {
        ...state,
        getVendorIDResult: action.payload.data,
        getVendorIDLoading: action.payload.loading,
        getVendorIDError: action.payload.errorMessage,
      };
    case GET_STOCK:
      return {
        ...state,
        getStockResult: action.payload.data,
        getStockLoading: action.payload.loading,
        getStockError: action.payload.errorMessage,
      };
    case GET_STOCKDETAIL:
      return {
        ...state,
        getStockDetailResult: action.payload.data,
        getStockDetailLoading: action.payload.loading,
        getStockDetailError: action.payload.errorMessage,
      };
    case GET_ORDER:
      return {
        ...state,
        getOrderResult: action.payload.data,
        getOrderLoading: action.payload.loading,
        getOrderError: action.payload.errorMessage,
      };
    case DELETE_ORDER:
      return {
        ...state,
        deleteheaderResult: action.payload.data,
        deleteheaderLoading: action.payload.loading,
        deleteheaderError: action.payload.errorMessage,
      };
    case ADDSTATUS_ORDER:
      return {
        ...state,
        addstatusheaderResult: action.payload.data,
        addstatusheaderLoading: action.payload.loading,
        addstatusheaderError: action.payload.errorMessage,
      };
    case GET_PURCHASE:
      return {
        ...state,
        getPurchaseResult: action.payload.data,
        getPurchaseLoading: action.payload.loading,
        getPurchaseError: action.payload.errorMessage,
      };
    case GET_HOTEL:
      return {
        ...state,
        getHotelResult: action.payload.data,
        getHotelLoading: action.payload.loading,
        getHotelError: action.payload.errorMessage,
      };
    case GET_HOTELID:
      return {
        ...state,
        getHotelIdResult: action.payload.data,
        getHotelIdLoading: action.payload.loading,
        getHotelIdError: action.payload.errorMessage,
      };
    case GET_GALLERY:
      return {
        ...state,
        getGalleryResult: action.payload.data,
        getGalleryLoading: action.payload.loading,
        getGalleryError: action.payload.errorMessage,
      };

      break;
    default:
      return state;
      break;
  }
};
export default PurchaseReducer;
