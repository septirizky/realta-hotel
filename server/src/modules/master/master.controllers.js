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
