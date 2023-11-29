import model from '../../../model/init-models.js';

export const helloSpof = async (req, res) => {
  try {
    return res.status(200).json({ message: 'hello from spof' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSpecialOffer = async (req, res) => {
  try {
    const {
      spof_name,
      spof_description,
      spof_type,
      spof_discount,
      spof_start_date,
      spof_end_date,
      spof_min_qty,
      spof_max_qty,
    } = req.body;

    if (new Date(spof_start_date) > new Date(spof_end_date)) {
      return res.status(400).json({
        message: `Waktu kupon diskon dimulai tidak boleh kurang dari waktu diskon berakhir`,
      });
    }

    const checkSpofName = await model.special_offers.findOne({
      where: {
        spof_name: spof_name,
      },
    });

    if (checkSpofName) {
      return res.status(400).json({
        message: `Diskon dengan nama ${spof_name} sudah ada, harap gunakan nama lain`,
      });
    }

    const result = await model.special_offers.create(
      {
        spof_name,
        spof_description,
        spof_type,
        spof_discount,
        spof_start_date,
        spof_end_date,
        spof_min_qty,
        spof_max_qty,
      },
      {
        returning: true,
      }
    );

    res.status(200).json({
      message: 'Berhasil menambah data',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSpecialOffer = async (req, res) => {
  try {
    const spofId = req.params.spofId;
    const {
      spof_name,
      spof_description,
      spof_type,
      spof_discount,
      spof_start_date,
      spof_end_date,
      spof_min_qty,
      spof_max_qty,
    } = req.body;

    const checkSpofName = await model.special_offers.findOne({
      where: {
        spof_id: spofId,
      },
    });

    if (!checkSpofName) {
      return res.status(400).json({
        message: `Diskon dengan id ${spofId} tidak ditemukan`,
      });
    }

    const checkDuplicate = await model.special_offers.findOne({
      where: {
        spof_name: spof_name,
      },
    });

    if (checkDuplicate && checkDuplicate.spof_id !== checkSpofName.spof_id) {
      return res.status(400).json({
        message: `Diskon dengan nama ${spof_name} sudah ada, harap gunakan nama lain`,
      });
    }

    const result = await model.special_offers.update(
      {
        spof_name,
        spof_description,
        spof_type,
        spof_discount,
        spof_start_date,
        spof_end_date,
        spof_min_qty,
        spof_max_qty,
      },
      {
        where: {
          spof_id: +spofId,
        },
        returning: true,
      }
    );

    res.status(201).json({
      message: 'Berhasil mengubah data',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllSpecialOffer = async (req, res) => {
  try {
    const result = await model.special_offers.findAndCountAll();

    res.status(200).json({
      message: 'Berhasil menampilkan semua data',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSpecialOfferById = async (req, res) => {
  try {
    const spofId = req.params.spofId;

    const result = await model.special_offers.findOne({
      where: {
        spof_id: +spofId,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: `Data dengan id ${spofId} tidak ditemukan`,
      });
    }

    res.status(200).json({
      message: `Berhasil menampilkan data dengan id ${spofId}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSpecialOffer = async (req, res) => {
  try {
    const data = await model.special_offers.destroy({
      where: {
        spof_id: +req.params.spofId,
      },
    });

    data === 1
      ? res.status(200).json({
          message: 'Berhasil menghapus data',
        })
      : res.status(400).json({
          message: `Gagal menghapus data dengan id id ${+req.params.spofId}`,
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpecialOfferActiveByName = async (req, res) => {
  try {
    const spofName = req.params.spofName;

    const result = await model.special_offers.findOne({
      where: {
        spof_name: spofName,
      },
    });

    if (!result) {
      return res.status(404).json({
        message: `Data dengan kode ${spofName} tidak ditemukan`,
      });
    }

    const date = new Date();
    const end = new Date(result.spof_end_date);
    const start = new Date(result.spof_start_date);

    // check date
    if (date > end) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${result.spof_name} sudah kadaluarsa`,
      });
    }
    if (date < start) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${result.spof_name} tidak ditemukan`,
      });
    }

    // check qty
    if (result.spof_max_qty < 1) {
      return res.status(400).json({
        message: `Kupon diskon dengan kode ${result.spof_name} sudah habis`,
      });
    }

    res.status(200).json({
      message: `Berhasil menampilkan data dengan id ${spofName}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
