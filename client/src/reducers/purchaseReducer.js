import {
  GET_VENDOR,
  GET_STOCK,
  GET_ORDER,
  GET_VENDORSTOCK,
  GET_VENDORID,
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

  getOrderResult: false,
  getOrderLoading: false,
  getOrderError: false,
};
const PurchaseReducer = (state = initialState, action) => {
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
    case GET_ORDER:
      return {
        ...state,
        getOrderResult: action.payload.data,
        getOrderLoading: action.payload.loading,
        getOrderError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
export default PurchaseReducer;
