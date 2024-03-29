import {
  GET_REGION,
  POST_REGION,
  UPDATE_REGION,
  DELETE_REGION,
  GET_COUNTRY,
  POST_COUNTRY,
  UPDATE_COUNTRY,
  GET_PROVINCE,
  GET_CITY,
  DELETE_COUNTRY,
  POST_PROVINCE,
  UPDATE_PROVINCE,
  DELETE_PROVINCE,
  POST_CITY,
  UPDATE_CITY,
  DELETE_CITY,
  GET_POLICY,
  POST_POLICY,
  UPDATE_POLICY,
  DELETE_POLICY,
  GET_SETA,
  POST_SETA,
  UPDATE_SETA,
  DELETE_SETA,
  GET_IPRICE,
  POST_IPRICE,
  UPDATE_IPRICE,
  DELETE_IPRICE,
  GET_CAGRO,
  POST_CAGRO,
  UPDATE_CAGRO,
  DELETE_CAGRO,
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
  postCountryResult: false,
  postCountryLoading: false,
  postCountryError: false,
  updateCountryResult: false,
  updateCountryLoading: false,
  updateCountryError: false,
  deleteCountryResult: false,
  deleteCountryLoading: false,
  deleteCountryError: false,
  postProvResult: false,
  postProvLoading: false,
  postProvError: false,
  updateProvResult: false,
  updateProvLoading: false,
  updateProvError: false,
  deleteProvResult: false,
  deleteProvLoading: false,
  deleteProvError: false,
  postCityResult: false,
  postCityLoading: false,
  postCityError: false,
  updateCityResult: false,
  updateCityLoading: false,
  updateCityError: false,
  deleteCityResult: false,
  deleteCityLoading: false,
  deleteCityError: false,
  getPolicyResult: false,
  getPolicyLoading: false,
  getPolicyError: false,
  postPolicyResult: false,
  postPolicyLoading: false,
  postPolicyError: false,
  updatePolicyResult: false,
  updatePolicyLoading: false,
  updatePolicyError: false,
  deletePolicyResult: false,
  deletePolicyLoading: false,
  deletePolicyError: false,
  getSetaResult: false,
  getSetaLoading: false,
  getSetaError: false,
  postSetaResult: false,
  postSetaLoading: false,
  postSetaError: false,
  updateSetaResult: false,
  updateSetaLoading: false,
  updateSetaError: false,
  deleteSetaResult: false,
  deleteSetaLoading: false,
  deleteSetaError: false,
  getIPriceResult: false,
  getIPriceLoading: false,
  getIPriceError: false,
  postIPriceResult: false,
  postIPriceLoading: false,
  postIPriceError: false,
  updateIPriceResult: false,
  updateIPriceLoading: false,
  updateIPriceError: false,
  deleteIPriceResult: false,
  deleteIPriceLoading: false,
  deleteIPriceError: false,
  getCagroResult: false,
  getCagroLoading: false,
  getCagroError: false,
  postCagroResult: false,
  postCagroLoading: false,
  postCagroError: false,
  updateCagroResult: false,
  updateCagroLoading: false,
  updateCagroError: false,
  deleteCagroResult: false,
  deleteCagroLoading: false,
  deleteCagroError: false,
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
    case POST_COUNTRY:
      return {
        ...state,
        postCountryResult: action.payload.data,
        postCountryLoading: action.payload.loading,
        postCountryError: action.payload.errorMsg,
      };
    case UPDATE_COUNTRY:
      return {
        ...state,
        updateCountryResult: action.payload.data,
        updateCountryLoading: action.payload.loading,
        updateCountryError: action.payload.errorMsg,
      };
    case DELETE_COUNTRY:
      return {
        ...state,
        deleteCountryResult: action.payload.data,
        deleteCountryLoading: action.payload.loading,
        deleteCountryError: action.payload.errorMsg,
      };
    case GET_PROVINCE:
      return {
        ...state,
        getProvinceResult: action.payload.data,
        getProvinveLoading: action.payload.loading,
        getProvinceError: action.payload.errorMsg,
      };
    case POST_PROVINCE:
      return {
        ...state,
        postProvResult: action.payload.data,
        postProvLoading: action.payload.loading,
        postProvError: action.payload.errorMsg,
      };
    case UPDATE_PROVINCE:
      return {
        ...state,
        updateProvResult: action.payload.data,
        updateProvLoading: action.payload.loading,
        updateProvError: action.payload.errorMsg,
      };
    case DELETE_PROVINCE:
      return {
        ...state,
        deleteProvResult: action.payload.data,
        deleteProvLoading: action.payload.loading,
        deleteProvError: action.payload.errorMsg,
      };
    case GET_CITY:
      return {
        ...state,
        getCityResult: action.payload.data,
        getCityLoading: action.payload.loading,
        getCityError: action.payload.errorMsg,
      };
    case POST_CITY:
      return {
        ...state,
        postCityResult: action.payload.data,
        postCityLoading: action.payload.loading,
        postCityError: action.payload.errorMsg,
      };
    case UPDATE_CITY:
      return {
        ...state,
        updateCityResult: action.payload.data,
        updateCityLoading: action.payload.loading,
        updateCityError: action.payload.errorMsg,
      };
    case DELETE_CITY:
      return {
        ...state,
        deleteCityResult: action.payload.data,
        deleteCityLoading: action.payload.loading,
        deleteCityError: action.payload.errorMsg,
      };
    case GET_POLICY:
      return {
        ...state,
        getPolicyResult: action.payload.data,
        getPolicyLoading: action.payload.loading,
        getPolicyError: action.payload.errorMsg,
      };
    case POST_POLICY:
      return {
        ...state,
        postPolicyResult: action.payload.data,
        postPolicyLoading: action.payload.loading,
        postPolicyError: action.payload.errorMsg,
      };
    case UPDATE_POLICY:
      return {
        ...state,
        updatePolicyResult: action.payload.data,
        updatePolicyLoading: action.payload.loading,
        updatePolicyError: action.payload.errorMsg,
      };
    case DELETE_POLICY:
      return {
        ...state,
        deletePolicyResult: action.payload.data,
        deletePolicyLoading: action.payload.loading,
        deletePolicyError: action.payload.errorMsg,
      };
    case GET_SETA:
      return {
        ...state,
        getSetaResult: action.payload.data,
        getSetaLoading: action.payload.loading,
        getSetaError: action.payload.errorMsg,
      };
    case POST_SETA:
      return {
        ...state,
        postSetaResult: action.payload.data,
        postSetaLoading: action.payload.loading,
        postSetaError: action.payload.errorMsg,
      };
    case UPDATE_SETA:
      return {
        ...state,
        updateSetaResult: action.payload.data,
        updateSetaLoading: action.payload.loading,
        updateSetaError: action.payload.errorMsg,
      };
    case DELETE_SETA:
      return {
        ...state,
        deleteSetaResult: action.payload.data,
        deleteSetaLoading: action.payload.loading,
        deleteSetaError: action.payload.errorMsg,
      };
    case GET_IPRICE:
      return {
        ...state,
        getIPriceResult: action.payload.data,
        getIPriceLoading: action.payload.loading,
        getIPriceError: action.payload.errorMsg,
      };
    case POST_IPRICE:
      return {
        ...state,
        postIPriceResult: action.payload.data,
        postIPriceLoading: action.payload.loading,
        postIPriceError: action.payload.errorMsg,
      };
    case UPDATE_IPRICE:
      return {
        ...state,
        updateIPriceResult: action.payload.data,
        updateIPriceLoading: action.payload.loading,
        updateIPriceError: action.payload.errorMsg,
      };
    case DELETE_IPRICE:
      return {
        ...state,
        deleteIPriceResult: action.payload.data,
        deleteIPriceLoading: action.payload.loading,
        deleteIPriceError: action.payload.errorMsg,
      };
    case GET_CAGRO:
      return {
        ...state,
        getCagroResult: action.payload.data,
        getCagroLoading: action.payload.loading,
        getCagroError: action.payload.errorMsg,
      };
    case POST_CAGRO:
      return {
        ...state,
        postCagroResult: action.payload.data,
        postCagroLoading: action.payload.loading,
        postCagroError: action.payload.errorMsg,
      };
    case UPDATE_CAGRO:
      return {
        ...state,
        updateCagroResult: action.payload.data,
        updateCagroLoading: action.payload.loading,
        updateCagroError: action.payload.errorMsg,
      };
    case DELETE_CAGRO:
      return {
        ...state,
        deleteCagroResult: action.payload.data,
        deleteCagroLoading: action.payload.loading,
        deleteCagroError: action.payload.errorMsg,
      };
    default:
      return state;
  }
};
export default masterReducer;
