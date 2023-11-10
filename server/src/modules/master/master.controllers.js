import models from "../../model/init-models.js";
import { dataHandling } from "./helper/dataHandling.js";
import fs from "fs";

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

// City
export const cityGetAll = async (req, res) => {
  try {
    const result = await models.city.findAll({
      order: [["city_id", "ASC"]],
      include: {
        model: models.provinces,
        as: "city_province",
        attributes: ["prov_name"],
        required: true,
      },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data city!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cityPost = async (req, res) => {
  try {
    const { city_name, city_province_id } = req.body;

    const result = await models.city.create({
      city_name: city_name,
      city_province_id: city_province_id,
    });

    return res
      .status(201)
      .json({ data: result, message: "Berhasil menambahkan data city!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cityUpdate = async (req, res) => {
  try {
    const { city_id } = req.params;
    const { city_name, city_province_id } = req.body;

    const result = await models.city.update(
      {
        city_name: city_name,
        city_province_id: city_province_id,
        updatedat: new Date(),
      },
      { where: { city_id: city_id }, returning: true }
    );

    return res
      .status(200)
      .json({ data: result, message: "Berhasil mengubah data city!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cityDelete = async (req, res) => {
  try {
    const { city_id } = req.params;

    const result = await models.city.destroy({
      where: { city_id: city_id },
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menghapus data city!" });
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

// category group
export const cagroGetAll = async (req, res) => {
  try {
    const result = await models.category_group.findAll({
      attributes: [
        "cagro_id",
        "cagro_name",
        "cagro_type",
        "cagro_description",
        "cagro_icon",
        "cagro_icon_url",
        "createdat",
        "updatedat",
      ],
      order: [["cagro_id", "ASC"]],
    });

    return res.status(200).json({
      data: result,
      message: "Berhasil menampilkan data category group!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cagroPost = async (req, res) => {
  try {
    const { cagro_name, cagro_type, cagro_description } = req.body;

    if (cagro_name === "" || cagro_name === undefined || cagro_name === null) {
      return res
        .status(400)
        .json({ message: "Nama Kategori Group Wajib diisi!" });
    }

    const cagro = await models.category_group.findOne({
      attributes: ["cagro_name"],
      where: { cagro_name: cagro_name },
    });

    if (cagro) {
      return res
        .status(400)
        .json({ message: "Nama Kategori " + cagro_name + " sudah ada!" });
    }

    if (cagro_type === "" || cagro_type === undefined || cagro_type === null) {
      return res
        .status(400)
        .json({ message: "Tipe Kategori Group Wajib diisi!" });
    }

    if (
      cagro_description === "" ||
      cagro_description === undefined ||
      cagro_description === null
    ) {
      return res
        .status(400)
        .json({ message: "Deskripsi Kategori Group Wajib diisi!" });
    }

    if (req.errorvalidatefile) {
      return res.status(422).json({ message: req.errorvalidatefile });
    } else {
      if (req.file) {
        const gambar = req.file.filename;
        const url_gambar =
          req.protocol +
          "://" +
          req.get("host") +
          "/assets/category_group/" +
          gambar;

        const result = await models.category_group.create({
          cagro_name: cagro_name,
          cagro_type: cagro_type,
          cagro_description: cagro_description,
          cagro_icon: gambar,
          cagro_icon_url: url_gambar,
        });

        return res
          .status(201)
          .send(dataHandling(result, "Berhasil menambahkan category group!"));
      } else {
        return res.status(400).json({ message: "Icon harus diisi!" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cagroUpdate = async (req, res) => {
  try {
    const { cagro_name, cagro_type, cagro_description } = req.body;
    const { cagro_id } = req.params;

    const cek_cagro_id = await models.category_group.findOne({
      attributes: ["cagro_id"],
      where: { cagro_id: cagro_id },
    });

    if (!cek_cagro_id) {
      return res
        .status(404)
        .json({ message: "Id Kategori Group " + cagro_id + " tidak ada!" });
    }

    if (cagro_name === "" || cagro_name === undefined || cagro_name === null) {
      return res
        .status(400)
        .json({ message: "Nama Kategori Group Wajib diisi!" });
    }

    if (cagro_type === "" || cagro_type === undefined || cagro_type === null) {
      return res
        .status(400)
        .json({ message: "Tipe Kategori Group Wajib diisi!" });
    }

    if (
      cagro_description === "" ||
      cagro_description === undefined ||
      cagro_description === null
    ) {
      return res
        .status(400)
        .json({ message: "Deskripsi Kategori Group Wajib diisi!" });
    }

    const gambardatabase = await models.category_group.findOne({
      attributes: ["cagro_icon"],
      where: { cagro_id: cagro_id },
    });

    if (!gambardatabase) {
      return res
        .status(404)
        .json({ message: "Icon Kategori Group ini tidak ada!" });
    }

    const oldImage =
      req.protocol +
      "://" +
      req.get("host") +
      "/assets/category_group/" +
      gambardatabase.cagro_icon;

    const oldImageName = oldImage.split("/").pop();

    if (req.errorvalidatefile) {
      return res.status(422).json({ message: req.errorvalidatefile });
    } else {
      if (req.file) {
        fs.unlinkSync(`./src/assets/category_group/${oldImageName}`);

        const gambar = req.file.filename;
        const url_gambar =
          req.protocol +
          "://" +
          req.get("host") +
          "/assets/category_group/" +
          gambar;

        const result = await models.category_group.update(
          {
            cagro_name: cagro_name,
            cagro_type: cagro_type,
            cagro_description: cagro_description,
            cagro_icon: gambar,
            cagro_icon_url: url_gambar,
            updatedat: new Date(),
          },
          { where: { cagro_id: cagro_id }, returning: true }
        );

        return res
          .status(200)
          .send(dataHandling(result, "Berhasil mengubah category group!"));
      } else {
        const gambar = oldImageName;
        const url = oldImage;

        const result = await models.category_group.update(
          {
            cagro_name: cagro_name,
            cagro_type: cagro_type,
            cagro_description: cagro_description,
            cagro_icon: gambar,
            cagro_icon_url: url,
            updatedat: new Date(),
          },
          { where: { cagro_id: cagro_id }, returning: true }
        );

        return res
          .status(200)
          .send(dataHandling(result, "Berhasil mengubah category group!"));
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const cagroDelete = async (req, res) => {
  try {
    const { cagro_id } = req.params;

    const cek_cagro_id = await models.category_group.findOne({
      attributes: ["cagro_id"],
      where: { cagro_id: cagro_id },
    });

    if (!cek_cagro_id) {
      return res
        .status(404)
        .json({ message: "Id Kategori Group " + cagro_id + " tidak ada!" });
    }

    const gambardatabase = await models.category_group.findOne({
      attributes: ["cagro_icon"],
      where: { cagro_id: cagro_id },
    });

    if (!gambardatabase) {
      return res
        .status(404)
        .json({ message: "Icon Kategori Group ini tidak ada!" });
    }

    const oldImage =
      req.protocol +
      "://" +
      req.get("host") +
      "/assets/category_group/" +
      gambardatabase.cagro_icon;

    const oldImageName = oldImage.split("/").pop();

    fs.unlinkSync(`./src/assets/category_group/${oldImageName}`);

    const result = await models.category_group.destroy({
      where: { cagro_id: cagro_id },
    });

    return res.send(dataHandling(result, "Berhasil menghapus category group!"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cagroDetail = async (req, res) => {
  try {
    const { cagro_id } = req.params;

    const cek_cagro_id = await models.category_group.findOne({
      attributes: ["cagro_id"],
      where: { cagro_id: cagro_id },
    });

    if (!cek_cagro_id) {
      return res
        .status(404)
        .json({ message: "Id Kategori Group " + cagro_id + " tidak ada!" });
    }

    const result = await models.category_group.findOne({
      attributes: [
        "cagro_id",
        "cagro_name",
        "cagro_type",
        "cagro_description",
        "cagro_icon",
        "cagro_icon_url",
        "createdat",
        "updatedat",
      ],
      where: { cagro_id: cagro_id },
      order: [["cagro_id", "ASC"]],
    });

    return res.status(200).json({
      data: result,
      message: "Berhasil menampilkan detail category group!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// policy category group
export const policagroGetAll = async (req, res) => {
  try {
    const result = await models.policy_category_group.findAll({
      include: [
        {
          model: models.policy,
          as: "poca_poli",
          required: true,
          attributes: ["poli_name"],
        },
        {
          model: models.category_group,
          as: "poca_cagro",
          required: true,
          attributes: ["cagro_name"],
        },
      ],
      order: [["poca_cagro_id", "ASC"]],
    });

    return res.status(200).json({
      data: result,
      message: "Berhasil menampilkan policy category group!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policagroPost = async (req, res) => {
  try {
    const { poca_poli_id, poca_cagro_id } = req.body;

    const result = await models.policy_category_group.create({
      poca_poli_id: poca_poli_id,
      poca_cagro_id: poca_cagro_id,
    });

    return res.status(201).json({
      data: result,
      message: "Berhasil menambahkan policy category group!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policagroUpdate = async (req, res) => {
  try {
    const { poca_cagro_id } = req.params;
    const { poca_poli_id } = req.body;

    const result = await models.policy_category_group.update(
      {
        poca_poli_id: poca_poli_id,
        updatedat: new Date(),
      },
      { where: { poca_cagro_id: poca_cagro_id }, returning: true }
    );

    return res.status(200).json({
      data: result,
      message: "Berhasil mengubah policy category group!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const policagroDelete = async (req, res) => {
  try {
    const { poca_cagro_id } = req.params;

    const result = await models.policy_category_group.destroy({
      where: { poca_cagro_id: poca_cagro_id },
    });

    return res.status(200).json({
      data: result,
      message: "Berhasil menghapus policy category group!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
