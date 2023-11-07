import { Router } from "express";
import {
  regionDelete,
  regionGetAll,
  regionPost,
  regionUpdate,
} from "./master.controllers.js";
import {
  createRegionsValidation,
  getRegionIdValidation,
  getRegionNameAlready,
  updateRegionValidation,
} from "./master.validations.js";
import { validatorsError } from "../../helper/validatorsError.js";
import { validatorsErrorNotFound } from "../../helper/validatorsErrorNotFound.js";

const masterRouters = Router();

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

export default masterRouters;
