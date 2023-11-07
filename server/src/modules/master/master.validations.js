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

export const getRegionNameAlready = [
  body("region_name").custom(async (value) => {
    const region = await models.regions.findOne({
      attributes: ["region_name"],
      where: { region_name: value },
    });

    if (region) {
      throw new Error("Nama Wilayah " + value + " sudah ada!");
    }
  }),
];

export const createCountryValidation = [
  body("country_name").notEmpty().withMessage("Nama Negara Wajib diisi!"),
  body("country_region_id").notEmpty().withMessage("Nama Wilayah Wajib diisi!"),
];

export const updateCountryValidation = [
  body("country_name").notEmpty().withMessage("Nama Negara Wajib diisi!"),
  body("country_region_id").notEmpty().withMessage("Nama Wilayah Wajib diisi!"),
];

export const getCountryIdValidation = [
  param("country_id").custom(async (value) => {
    const country = await models.country.findOne({
      where: { country_id: value },
    });

    if (!country) {
      throw new Error("Id Negara " + value + " tidak ada!");
    }
  }),
];

export const getCountryNameAlready = [
  body("country_name").custom(async (value) => {
    const countries = await models.country.findOne({
      attributes: ["country_name"],
      where: { country_name: value },
    });

    if (countries) {
      throw new Error("Nama Negara " + value + " sudah ada!");
    }
  }),
];
