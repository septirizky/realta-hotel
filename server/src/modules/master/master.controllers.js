import models from "../../model/init-models.js";

export const regionGetAll = async (req, res) => {
  try {
    const result = await models.regions.findAll({
      order: [["region_code", "ASC"]],
    });

    return res
      .status(200)
      .json({ data: result, message: "Berhasil menampilkan data regions!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
  }
};
