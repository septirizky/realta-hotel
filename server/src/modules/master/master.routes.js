import { Router } from "express";
import {
  addressDelete,
  addressGetAll,
  addressPost,
  addressUpdate,
  cagroDelete,
  cagroDetail,
  cagroGetAll,
  cagroPost,
  cagroUpdate,
  cityDelete,
  cityGetAll,
  cityPost,
  cityUpdate,
  countryDelete,
  countryGetAll,
  countryPost,
  countryUpdate,
  policagroDelete,
  policagroGetAll,
  policagroPost,
  policagroUpdate,
  policyDelete,
  policyDetailDescription,
  policyGetAll,
  policyPost,
  policyUpdate,
  provinceDelete,
  provinceGetAll,
  provincePost,
  provinceUpdate,
  regionDelete,
  regionGetAll,
  regionPost,
  regionUpdate,
} from "./master.controllers.js";
import {
  cekIDPocaCategoryGroup,
  createAddressValidation,
  createCityValidation,
  createCountryValidation,
  createPoliCagroValidation,
  createPolicyValidation,
  createProvinceValidation,
  createRegionsValidation,
  getAddressIdValidation,
  getCityIdValidation,
  getCityNameAlready,
  getCountryIdValidation,
  getCountryNameAlready,
  getPolicyIdValidation,
  getProvinceIdValidation,
  getProvinceNameAlready,
  getRegionIdValidation,
  getRegionNameAlready,
  updateAddressValidation,
  updateCityValidation,
  updateCountryValidation,
  updatePoliCagroValidation,
  updatePolicyValidation,
  updateProvinceValidation,
  updateRegionValidation,
} from "./master.validations.js";
import { validatorsError } from "./helper/validatorsError.js";
import { validatorsErrorNotFound } from "./helper/validatorsErrorNotFound.js";
import uploadCategoryGroup from "./middleware/multerCategory.js";

const masterRouters = Router();

// regions
masterRouters.get("/regions", regionGetAll);
masterRouters.post(
  "/regions",
  createRegionsValidation,
  getRegionNameAlready,
  validatorsError,
  regionPost
);
masterRouters.put(
  "/regions/:region_code",
  getRegionIdValidation,
  updateRegionValidation,
  validatorsErrorNotFound,
  validatorsError,
  regionUpdate
);
masterRouters.delete(
  "/regions/:region_code",
  getRegionIdValidation,
  validatorsErrorNotFound,
  regionDelete
);

// country
masterRouters.get("/country", countryGetAll);
masterRouters.post(
  "/country",
  createCountryValidation,
  getCountryNameAlready,
  validatorsError,
  countryPost
);
masterRouters.put(
  "/country/:country_id",
  getCountryIdValidation,
  updateCountryValidation,
  validatorsErrorNotFound,
  validatorsError,
  countryUpdate
);
masterRouters.delete(
  "/country/:country_id",
  getCountryIdValidation,
  validatorsErrorNotFound,
  countryDelete
);

// province
masterRouters.get("/province", provinceGetAll);
masterRouters.post(
  "/province",
  getProvinceNameAlready,
  createProvinceValidation,
  validatorsErrorNotFound,
  validatorsError,
  provincePost
);
masterRouters.put(
  "/province/:prov_id",
  getProvinceIdValidation,
  updateProvinceValidation,
  validatorsErrorNotFound,
  validatorsError,
  provinceUpdate
);
masterRouters.delete(
  "/province/:prov_id",
  getProvinceIdValidation,
  validatorsErrorNotFound,
  provinceDelete
);

// city
masterRouters.get("/city", cityGetAll);
masterRouters.post(
  "/city",
  getCityNameAlready,
  createCityValidation,
  validatorsError,
  cityPost
);
masterRouters.put(
  "/city/:city_id",
  getCityIdValidation,
  updateCityValidation,
  validatorsErrorNotFound,
  validatorsError,
  cityUpdate
);
masterRouters.delete(
  "/city/:city_id",
  getCityIdValidation,
  validatorsErrorNotFound,
  cityDelete
);

// address
masterRouters.get("/address", addressGetAll);
masterRouters.post(
  "/address",
  createAddressValidation,
  validatorsError,
  addressPost
);
masterRouters.put(
  "/address/:addr_id",
  getAddressIdValidation,
  updateAddressValidation,
  validatorsErrorNotFound,
  validatorsError,
  addressUpdate
);
masterRouters.delete(
  "/address/:addr_id",
  getAddressIdValidation,
  validatorsErrorNotFound,
  addressDelete
);

// policy
masterRouters.get("/policy", policyGetAll);
masterRouters.post(
  "/policy",
  createPolicyValidation,
  validatorsError,
  policyPost
);
masterRouters.put(
  "/policy/:poli_id",
  getPolicyIdValidation,
  updatePolicyValidation,
  validatorsErrorNotFound,
  validatorsError,
  policyUpdate
);
masterRouters.delete(
  "/policy/:poli_id",
  getPolicyIdValidation,
  validatorsErrorNotFound,
  policyDelete
);
masterRouters.get(
  "/policy/:poli_id",
  getPolicyIdValidation,
  validatorsErrorNotFound,
  policyDetailDescription
);

// category group
masterRouters.get("/cagro", cagroGetAll);
masterRouters.post(
  "/cagro",
  uploadCategoryGroup.single("cagro_icon"),
  cagroPost
);
masterRouters.put(
  "/cagro/:cagro_id",
  uploadCategoryGroup.single("cagro_icon"),
  cagroUpdate
);
masterRouters.delete("/cagro/:cagro_id", cagroDelete);
masterRouters.get("/cagro/:cagro_id", cagroDetail);

// policy category group
masterRouters.get("/policagro", policagroGetAll);
masterRouters.post(
  "/policagro",
  createPoliCagroValidation,
  validatorsError,
  policagroPost
);
masterRouters.put(
  "/policagro/:poca_cagro_id",
  cekIDPocaCategoryGroup,
  updatePoliCagroValidation,
  validatorsErrorNotFound,
  validatorsError,
  policagroUpdate
);
masterRouters.delete(
  "/policagro/:poca_cagro_id",
  cekIDPocaCategoryGroup,
  validatorsErrorNotFound,
  policagroDelete
);
export default masterRouters;
