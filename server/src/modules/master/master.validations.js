import { body, param } from "express-validator";
import models from "../../model/init-models.js";

export const createRegionsValidation = [
  body("region_name").notEmpty().withMessage("Nama Wilayah Wajib diisi!"),
];

export const updateRegionValidation = [
  body("region_name").notEmpty().withMessage("Nama Wilayah Wajib diisi!"),
];

export const getRegionIdValidation = [
  param("region_code").custom(async (value) => {
    const region = await models.regions.findOne({
      where: { region_code: value },
    });

    if (!region) {
      throw new Error("Kode Wilayah " + value + " tidak ada!");
    }
  }),
];
