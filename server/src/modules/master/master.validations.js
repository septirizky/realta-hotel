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

export const createProvinceValidation = [
  body("prov_name").notEmpty().withMessage("Nama Provinsi Wajib diisi!"),
  body("prov_country_id").notEmpty().withMessage("Nama Negara Wajib diisi!"),
];

export const updateProvinceValidation = [
  body("prov_name").notEmpty().withMessage("Nama Provinsi Wajib diisi!"),
  body("prov_country_id").notEmpty().withMessage("Nama Negara Wajib diisi!"),
];

export const getProvinceIdValidation = [
  param("prov_id").custom(async (value) => {
    const country = await models.provinces.findOne({
      where: { prov_id: value },
    });

    if (!country) {
      throw new Error("Id Provinsi " + value + " tidak ada!");
    }
  }),
];

export const getProvinceNameAlready = [
  body("prov_name").custom(async (value) => {
    const province = await models.provinces.findOne({
      attributes: ["prov_name"],
      where: { prov_name: value },
    });

    if (province) {
      throw new Error("Nama Provinsi " + value + " sudah ada!");
    }
  }),
];

export const createCityValidation = [
  body("city_name").notEmpty().withMessage("Nama Kota harus diisi!"),
  body("city_province_id").notEmpty().withMessage("Nama Provinsi wajib diisi!"),
];

export const updateCityValidation = [
  body("city_name").notEmpty().withMessage("Nama Kota harus diisi!"),
  body("city_province_id").notEmpty().withMessage("Nama Provinsi wajib diisi!"),
];

export const getCityNameAlready = [
  body("city_name").custom(async (value) => {
    const city = await models.city.findOne({
      attributes: ["city_name"],
      where: { city_name: value },
    });

    if (city) {
      throw new Error("Nama Kota " + value + " sudah ada!");
    }
  }),
];

export const getCityIdValidation = [
  param("city_id").custom(async (value) => {
    const city = await models.city.findOne({
      where: { city_id: value },
    });

    if (!city) {
      throw new Error("Id Kota " + value + " tidak ada!");
    }
  }),
];

export const createAddressValidation = [
  body("addr_line_1").notEmpty().withMessage("Alamat 1 Wajib diisi!"),
  body("addr_postal_code").notEmpty().withMessage("Kode Pos Wajib diisi!"),
  body("addr_prov_id").notEmpty().withMessage("Nama Provinsi Wajib diisi!"),
];

export const updateAddressValidation = [
  body("addr_line_1").notEmpty().withMessage("Alamat 1 Wajib diisi!"),
  body("addr_postal_code").notEmpty().withMessage("Kode Pos Wajib diisi!"),
  body("addr_prov_id").notEmpty().withMessage("Nama Provinsi Wajib diisi!"),
];

export const getAddressIdValidation = [
  param("addr_id").custom(async (value) => {
    const address = await models.address.findOne({
      where: { addr_id: value },
    });

    if (!address) {
      throw new Error("Id Alamat " + value + " tidak ada!");
    }
  }),
];

export const createPolicyValidation = [
  body("poli_name").notEmpty().withMessage("Nama Kebijakan Wajib diisi!"),
  body("poli_description")
    .notEmpty()
    .withMessage("Deskripsi Kebijakan Wajib diisi!"),
];

export const updatePolicyValidation = [
  body("poli_name").notEmpty().withMessage("Nama Kebijakan Wajib diisi!"),
  body("poli_description")
    .notEmpty()
    .withMessage("Deskripsi Kebijakan Wajib diisi!"),
];

export const getPolicyIdValidation = [
  param("poli_id").custom(async (value) => {
    const policy = await models.policy.findOne({
      where: { poli_id: value },
    });

    if (!policy) {
      throw new Error("Id Policy " + value + " tidak ada!");
    }
  }),
];

export const createPoliCagroValidation = [
  body("poca_poli_id").notEmpty().withMessage("Nama Kebijakan Wajib diisi!"),
  body("poca_cagro_id")
    .notEmpty()
    .withMessage("Nama Kategori Grup Wajib diisi!"),
];

export const updatePoliCagroValidation = [
  body("poca_poli_id").notEmpty().withMessage("Nama Kebijakan Wajib diisi!"),
];

export const cekIDPocaCategoryGroup = [
  param("poca_cagro_id").custom(async (value) => {
    const policy_category_group = await models.policy_category_group.findOne({
      where: { poca_cagro_id: value },
    });

    if (!policy_category_group) {
      throw new Error("Id Kategori Grup " + value + " tidak ada!");
    }
  }),
];

export const createServiceTaskValidation = [
  body("seta_name").notEmpty().withMessage("Nama Tugas Jasa Wajib diisi!"),
  body("seta_seq").notEmpty().withMessage("Urutan Tugas Jasa Wajib diisi!"),
];

export const updateServiceTaskValidation = [
  body("seta_name").notEmpty().withMessage("Nama Tugas Jasa Wajib diisi!"),
  body("seta_seq").notEmpty().withMessage("Urutan Tugas Jasa Wajib diisi!"),
];

export const getServiceTaskNameAlready = [
  body("seta_name").custom(async (value) => {
    const service_task = await models.service_task.findOne({
      attributes: ["seta_name"],
      where: { seta_name: value },
    });

    if (service_task) {
      throw new Error("Nama Tugas Jasa " + value + " sudah ada!");
    }
  }),
];

export const getServiceTaskIdValidation = [
  param("seta_id").custom(async (value) => {
    const service_task = await models.service_task.findOne({
      where: { seta_id: value },
    });

    if (!service_task) {
      throw new Error("Id Tugas Jasa " + value + " tidak ada!");
    }
  }),
];

export const createMemberValidation = [
  body("memb_name").notEmpty().withMessage("Nama Member Wajib diisi!"),
  body("memb_description")
    .notEmpty()
    .withMessage("Deskripsi Member Wajib diisi!"),
];

export const updateMemberValidation = [
  body("memb_description")
    .notEmpty()
    .withMessage("Deskripsi Member Wajib diisi!"),
];

export const getMemberNameValidation = [
  param("memb_name").custom(async (value) => {
    const members = await models.members.findOne({
      where: { memb_name: value },
    });

    if (!members) {
      throw new Error("Nama Member " + value + " tidak ada!");
    }
  }),
];
