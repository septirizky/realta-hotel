import { Op } from "sequelize";
import models, { sequelize } from "../../model/init-models.js";

export const city = async (req, res) => {
  try {
    const result = await models.city.findAll({
      include: {
        model: models.provinces,
        as: "city_province",
        required: true,
        attributes: ["prov_name"],
        include: {
          model: models.country,
          as: "prov_country",
          required: true,
          attributes: ["country_name"],
          include: {
            model: models.regions,
            as: "country_region",
            required: true,
            attributes: ["region_name"],
          },
        },
      },
      attributes: ["city_id", "city_name"],
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const hotel = async (req, res) => {
  try {
    const { keyword } = req.body;
    const result = await models.hotels.findAll({
      where: {
        hotel_name: {
          [Op.iLike]: `%${keyword ? keyword : ""}%`,
        },
      },
      include: {
        model: models.address,
        as: "hotel_addr",
        required: true,
      },
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil hotel" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const hotelAdd = async (req, res) => {
  try {
    const {
      name,
      description,
      phonenumber,
      status,
      address,
      city,
      ratingstar,
    } = req.body;

    const addr = await models.address.create(
      {
        addr_line_1: address,
        addr_city_id: city,
      },
      { returning: true }
    );

    const result = await models.hotels.create({
      hotel_name: name,
      hotel_description: description,
      hotel_phonenumber: phonenumber,
      hotel_status: status,
      hotel_modified_date: new Date(),
      hotel_rating_star: ratingstar,
      hotel_addr_id: addr.dataValues.addr_id,
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil tambah hotel" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const hotelUpdate = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const {
      name,
      description,
      phonenumber,
      status,
      address,
      addr_id,
      city,
      ratingstar,
    } = req.body;

    const addr = await models.address.update(
      {
        addr_line_1: address,
        addr_city_id: city,
      },
      { where: { addr_id: addr_id }, returning: true }
    );

    const result = await models.hotels.update(
      {
        hotel_name: name,
        hotel_description: description,
        hotel_phonenumber: phonenumber,
        hotel_status: status,
        hotel_modified_date: new Date(),
        hotel_rating_star: ratingstar,
      },
      { where: { hotel_id: hotel_id }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "berhasil update hotel" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const hotelDelete = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const result = await models.hotels.destroy({
      where: { hotel_id: hotel_id },
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil hapus hotel" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const facilities = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const result = await models.facilities.findAll(
      { where: { faci_hotel_id: hotel_id }, returning: true },
      {
        include: {
          model: models.hotels,
          as: "faci_hotel",
          required: true,
          attributes: ["hotel_name", "hotel_phonenumber", "hotel_rating_star"],
          include: {
            model: models.address,
            as: "hotel_addr",
            attributes: ["addr_line_1"],
          },
        },
      }
    );
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const facilitiesAll = async (req, res) => {
  try {
    const { hotel_id } = req.params;
    const result = await models.facilities.findAll(
      {
        include: {
          model: models.hotels,
          as: "faci_hotel",
          required: true,
          attributes: ["hotel_name", "hotel_phonenumber", "hotel_rating_star"],
          include: {
            model: models.address,
            as: "hotel_addr",
            attributes: ["addr_line_1"],
          },
        },
      }
    );
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllFacilities = async (req, res) => {
  try {
    const result = await models.facilities.findAll(
        {
          attributes: ["faci_id", "faci_name"]
        }
    );
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const facilitiesAdd = async (req, res) => {
  try {
    const {
      name,
      room_number,
      max_vacant,
      description,
      low_price,
      high_price,
      rate_price,
      discount,
      tax,
      startdate,
      enddate,
      cagro_id,
      hotel_id,
    } = req.body;

    const result = await models.facilities.create({
      faci_name: name,
      faci_room_number: room_number,
      faci_measure_unit: max_vacant,
      faci_description: description,
      faci_low_price: low_price,
      faci_high_price: high_price,
      faci_rate_price: rate_price,
      faci_discount: discount,
      faci_tax_rate: tax,
      faci_startdate: startdate,
      faci_enddate: enddate,
      faci_cagro_id: cagro_id,
      faci_hotel_id: hotel_id,
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil tambah facilities" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const facilitiesUpdate = async (req, res) => {
  try {
    const {
      name,
      room_number,
      max_number,
      max_vacant,
      low_price,
      high_price,
      rate_price,
      discount,
      tax,
      startdate,
      enddate,
      description,
      cagro_id,
      hotel_id,
    } = req.body;
    const data = await models.facilities.findOne({
      where: { faci_id: req.params.faci_id },
      returning: true,
    });

    const result = await models.facility_price_history.create({
      faph_low_price: data.faci_low_price,
      faph_high_price: data.faci_high_price,
      faph_rate_price: data.faci_rate_price,
      faph_discount: data.faci_discount,
      faph_tax_rate: data.faci_tax_rate,
      faph_startdate: data.faci_startdate,
      faph_enddate: data.faci_enddate,
      faph_faci_id: data.faci_id,
    });

    const result2 = await models.facilities.update(
      {
        faci_name: name,
        faci_room_number: room_number,
        faci_max_number: max_number,
        faci_measure_unit: max_vacant,
        faci_low_price: low_price,
        faci_high_price: high_price,
        faci_rate_price: rate_price,
        faci_discount: discount,
        faci_tax_rate: tax,
        faci_startdate: startdate,
        faci_enddate: enddate,
        faci_description: description,
        faci_cagro_id: cagro_id,
        faci_hotel_id: hotel_id,
      },
      { where: { faci_id: req.params.faci_id }, returning: true }
    );
    return res
      .status(200)
      .json({ data: result2, message: "berhasil update facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const facilitiesDelete = async (req, res) => {
  try {
    const { faci_id } = req.params;
    const result = await models.facilities.destroy(
      {
        where: { faci_id: faci_id },
      },
      {
        include: { model: models.hotels, as: "hotels", required: true },
      }
    );
    return res
      .status(200)
      .json({ data: result, message: "berhasil hapus facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const category = async (req, res) => {
  try {
    const result = await models.category_group.findAll({
      attributes: ["cagro_id", "cagro_name"],
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPhoto = async (req, res) => {
  try {
    const { faci_id } = req.params;
    const result = await models.facility_photos.findAll(
      { where: { fapho_faci_id: faci_id }, returning: true },
      {
        include: {
          model: models.facilities,
          as: "fapho_faci",
          required: true,
        },
      }
    );
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facilities photo" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadFaciPhoto = async (req, res) => {
  try {
    const { primary, faci_id } = req.body;
    let result;
    req.files.map(async (photo, index) => {
      const url = `${req.protocol}://${req.get("host")}/uploads/${
        req.files[index].filename
      }`;
      result = await models.facility_photos.create(
        {
          fapho_thumbnail_filename: photo.path,
          fapho_photo_filename: photo.filename,
          fapho_primary: primary,
          fapho_url: url,
          fapho_faci_id: faci_id,
        },
        { returning: true }
      );
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil upload photo" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const photoDelete = async (req, res) => {
  try {
    const { fapho_id } = req.params;
    const result = await models.facility_photos.destroy(
      {
        where: { fapho_id: fapho_id },
      },
      {
        include: {
          model: models.hotels,
          as: "facility_photos",
          required: true,
        },
      }
    );
    return res
      .status(200)
      .json({ data: result, message: "berhasil hapus facilities" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const facilityHistory = async (req, res) => {
  try {
    const result = await models.facility_price_history.findAll();
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil facility history" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
