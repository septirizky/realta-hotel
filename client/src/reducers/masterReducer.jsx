import {
  GET_REGION,
  POST_REGION,
  UPDATE_REGION,
  DELETE_REGION,
  GET_COUNTRY,
  GET_PROVINCE,
  GET_CITY,
} from "../actions/masterAction";

const initialState = {
  getRegionsResult: false,
  getRegionsLoading: false,
  getRegionsError: false,
  getCountryResult: false,
  getCountryLoading: false,
  getCountryError: false,
  getProvinceResult: false,
  getProvinveLoading: false,
  getProvinceError: false,
  getCityResult: false,
  getCityLoading: false,
  getCityError: false,
  postRegionResult: false,
  postRegionLoading: false,
  postRegionError: false,
  deleteRegionResult: false,
  deleteRegionLoading: false,
  deleteRegionError: false,
  updateRegionResult: false,
  updateRegionLoading: false,
  updateRegionError: false,
};
const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGION:
      return {
        ...state,
        getRegionsResult: action.payload.data,
        getRegionsLoading: action.payload.loading,
        getRegionsError: action.payload.errorMsg,
      };
    case POST_REGION:
      return {
        ...state,
        postRegionResult: action.payload.data,
        postRegionLoading: action.payload.loading,
        postRegionError: action.payload.errorMsg,
      };
    case UPDATE_REGION:
      return {
        ...state,
        updateRegionResult: action.payload.data,
        updateRegionLoading: action.payload.loading,
        updateRegionError: action.payload.errorMsg,
      };
    case DELETE_REGION:
      return {
        ...state,
        deleteRegionResult: action.payload.data,
        deleteRegionLoading: action.payload.loading,
        deleteRegionError: action.payload.errorMsg,
      };
    case GET_COUNTRY:
      return {
        ...state,
        getCountryResult: action.payload.data,
        getCountryLoading: action.payload.loading,
        getCountryError: action.payload.errorMsg,
      };
    case GET_PROVINCE:
      return {
        ...state,
        getProvinceResult: action.payload.data,
        getProvinveLoading: action.payload.loading,
        getProvinceError: action.payload.errorMsg,
      };
    case GET_CITY:
      return {
        ...state,
        getCityResult: action.payload.data,
        getCityLoading: action.payload.loading,
        getCityError: action.payload.errorMsg,
      };
    default:
      return state;
  }
};
export default masterReducer;
