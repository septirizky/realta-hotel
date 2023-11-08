import models from "../../model/init-models.js";

// Regions
export const regionGetAll = async (req, res) => {
  try {
    const result = await models.regions.findAll({
      order: [["region_code", "ASC"]],
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data regions!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const regionPost = async (req, res) => {
  try {
    const { region_name } = req.body;

    const result = await models.regions.create({ region_name: region_name });

    return res
      .status(201)
      .json({ data: result, message: "Berhasil menambahkan data regions!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const regionUpdate = async (req, res) => {
  try {
    const { region_code } = req.params;
    const { region_name } = req.body;

    const result = await models.regions.update(
      {
        region_name: region_name,
        updatedat: new Date(),
      },
      { where: { region_code: region_code }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "Berhasil mengubah data regions!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const regionDelete = async (req, res) => {
  try {
    const { region_code } = req.params;

    const result = await models.regions.destroy({
      where: { region_code: region_code },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menghapus data regions!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Country
export const countryGetAll = async (req, res) => {
  try {
    const result = await models.country.findAll({
      order: [["country_id", "ASC"]],
      include: {
        model: models.regions,
        as: "country_region",
        attributes: ["region_name"],
        required: true,
      },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data country!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countryPost = async (req, res) => {
  try {
    const { country_name, country_region_id } = req.body;

    const result = await models.country.create({
      country_name: country_name,
      country_region_id: country_region_id,
    });

    return res
      .status(201)
      .json({ data: result, message: "Berhasil menambahkan data country!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countryUpdate = async (req, res) => {
  try {
    const { country_id } = req.params;
    const { country_name, country_region_id } = req.body;

    const result = await models.country.update(
      {
        country_name: country_name,
        country_region_id: country_region_id,
        updatedat: new Date(),
      },
      { where: { country_id: country_id }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "Berhasil mengubah data country!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countryDelete = async (req, res) => {
  try {
    const { country_id } = req.params;

    const result = await models.country.destroy({
      where: { country_id: country_id },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menghapus data country!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Province
export const provinceGetAll = async (req, res) => {
  try {
    const result = await models.provinces.findAll({
      order: [["prov_id", "ASC"]],
      include: {
        model: models.country,
        as: "prov_country",
        attributes: ["country_name"],
        required: true,
      },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data province!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const provincePost = async (req, res) => {
  try {
    const { prov_name, prov_country_id } = req.body;

    const result = await models.provinces.create({
      prov_name: prov_name,
      prov_country_id: prov_country_id,
    });

    return res
      .status(201)
      .json({ data: result, message: "Berhasil menambahkan data province!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const provinceUpdate = async (req, res) => {
  try {
    const { prov_id } = req.params;
    const { prov_name, prov_country_id } = req.body;

    const result = await models.provinces.update(
      {
        prov_name: prov_name,
        prov_country_id: prov_country_id,
        updatedat: new Date(),
      },
      { where: { prov_id: prov_id }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "Berhasil mengubah data province!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const provinceDelete = async (req, res) => {
  try {
    const { prov_id } = req.params;

    const result = await models.provinces.destroy({
      where: { prov_id: prov_id },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menghapus data province!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Address
export const addressGetAll = async (req, res) => {
  try {
    const result = await models.address.findAll({
      order: [["addr_id", "ASC"]],
      include: {
        model: models.provinces,
        as: "addr_prov",
        attributes: ["prov_name"],
        required: true,
      },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data address!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addressPost = async (req, res) => {
  try {
    const {
      addr_line_1,
      addr_line_2,
      addr_postal_code,
      addr_spatial_location,
      addr_prov_id,
    } = req.body;

    const result = await models.address.create({
      addr_line_1: addr_line_1,
      addr_line_2: addr_line_2,
      addr_postal_code: addr_postal_code,
      addr_spatial_location: addr_spatial_location,
      addr_prov_id: addr_prov_id,
    });

    return res
      .status(201)
      .json({ data: result, message: "Berhasil menambahkan data address!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addressUpdate = async (req, res) => {
  try {
    const { addr_id } = req.params;
    const {
      addr_line_1,
      addr_line_2,
      addr_postal_code,
      addr_spatial_location,
      addr_prov_id,
    } = req.body;

    const result = await models.address.update(
      {
        addr_line_1: addr_line_1,
        addr_line_2: addr_line_2,
        addr_postal_code: addr_postal_code,
        addr_spatial_location: addr_spatial_location,
        addr_prov_id: addr_prov_id,
        updatedat: new Date(),
      },
      { where: { addr_id: addr_id }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "Berhasil mengubah data address!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addressDelete = async (req, res) => {
  try {
    const { addr_id } = req.params;

    const result = await models.address.destroy({
      where: { addr_id: addr_id },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menghapus data address!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// policy
export const policyGetAll = async (req, res) => {
  try {
    const result = await models.policy.findAll({
      order: [["poli_id", "ASC"]],
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data policy!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policyPost = async (req, res) => {
  try {
    const { poli_name, poli_description } = req.body;

    const result = await models.policy.create({
      poli_name: poli_name,
      poli_description: poli_description,
    });

    return res
      .status(201)
      .json({ data: result, message: "Berhasil menambahkan data policy!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policyUpdate = async (req, res) => {
  try {
    const { poli_id } = req.params;
    const { poli_name, poli_description } = req.body;

    const result = await models.policy.update(
      {
        poli_name: poli_name,
        poli_description: poli_description,
        updatedat: new Date(),
      },
      { where: { poli_id: poli_id }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "Berhasil mengubah data policy!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policyDelete = async (req, res) => {
  try {
    const { poli_id } = req.params;

    const result = await models.policy.destroy({
      where: { poli_id: poli_id },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menghapus data policy!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policyDetailDescription = async (req, res) => {
  try {
    const { poli_id } = req.params;
    const result = await models.policy.findOne({
      attributes: ["poli_description"],
      where: { poli_id: poli_id },
    });
    return res
      .status(200)
      .json({ data: result, message: "Data berhasil policy detail!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
