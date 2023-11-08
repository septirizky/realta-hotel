import { Router } from "express";
import {
  addressDelete,
  addressGetAll,
  addressPost,
  addressUpdate,
  countryDelete,
  countryGetAll,
  countryPost,
  countryUpdate,
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
  createAddressValidation,
  createCountryValidation,
  createProvinceValidation,
  createRegionsValidation,
  getAddressIdValidation,
  getCountryIdValidation,
  getCountryNameAlready,
  getProvinceIdValidation,
  getProvinceNameAlready,
  getRegionIdValidation,
  getRegionNameAlready,
  updateAddressValidation,
  updateCountryValidation,
  updateProvinceValidation,
  updateRegionValidation,
} from "./master.validations.js";
import { validatorsError } from "./helper/validatorsError.js";
import { validatorsErrorNotFound } from "./helper/validatorsErrorNotFound.js";

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
export default masterRouters;
