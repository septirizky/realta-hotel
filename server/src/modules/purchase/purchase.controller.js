import models, { sequelize } from "../../model/init-models.js";
import path from "path";
// CRUD Vendor
const getvendor = async (req, res) => {
  try {
    const result = await models.vendor.findAll();
    res.status(201).json({ data: result, message: "Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getvendorbyId = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await models.vendor.findOne({
      where: { vendor_entity_id: req.params.id },
    });
    res.status(201).json({ data: result, message: "Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const insertvendor = async (req, res) => {
  try {
    const {
      vendor_name,
      status,
      vendor_priority,
      vendro_weburl,
      vendor_register_date,
    } = req.body;
    console.log(
      vendor_name,
      status,
      vendor_priority,
      vendro_weburl,
      vendor_register_date
    );
    const result = await models.vendor.create({
      vendor_name: vendor_name,
      vendor_active: status,
      vendor_register_date: vendor_register_date,
      vendor_priority: vendor_priority,
      vendro_weburl: vendro_weburl,
    });
    res.status(201).json({ data: result, message: "Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletevendor = async (req, res) => {
  try {
    const result = await models.vendor.destroy({
      where: { vendor_entity_id: req.params.id },
    });
    res.status(201).json({ data: result, message: "Delete Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatevendor = async (req, res) => {
  try {
    const {
      vendor_name,
      vendor_active,
      vendor_priority,
      vendro_weburl,
      vendor_register_date,
    } = req.body;
    const result = await models.vendor.update(
      {
        vendor_name: vendor_name,
        vendor_active: vendor_active,
        vendor_priority: vendor_priority,
        vendro_weburl: vendro_weburl,
        vendor_register_date: vendor_register_date,
      },
      { where: { vendor_entity_id: req.body.id }, returning: true }
    );
    res.status(201).json({ data: result, message: "Update Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//CRUD Vendor Product
const getstokvendorproduct = async (req, res) => {
  try {
    const query = `select purchase.stocks.stock_name,purchase.vendor_product.vepro_qty_stocked,purchase.vendor.vendor_entity_id,
                    purchase.vendor_product.vepro_qty_remaining,purchase.stocks.stock_id,
                    purchase.vendor_product.vepro_price from purchase.stocks join 
                    purchase.vendor_product on 
                    purchase.vendor_product.vepro_stock_id=purchase.stocks.stock_id join purchase.vendor on
                    purchase.vendor.vendor_entity_id=purchase.vendor_product.vepro_vendor_id where purchase.vendor_product.vepro_vendor_id=${req.params.id}`;
    const result = await sequelize.query(query);
    res.status(201).json({ data: result[0], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const insertstokvendorproduct = async (req, res) => {
  try {
    const {
      vepro_qty_stocked,
      vepro_qty_remaining,
      vepro_price,
      vepro_stock_id,
      vepro_vendor_id,
    } = req.body;
    const result = await models.vendor_product.create({
      vepro_qty_stocked: vepro_qty_stocked,
      vepro_qty_remaining: vepro_qty_remaining,
      vepro_price: vepro_price,
      vepro_stock_id: vepro_stock_id,
      vepro_vendor_id: vepro_vendor_id,
    });
    res.status(201).json({ data: result, message: "Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletevendorproduct = async (req, res) => {
  try {
    const result = await models.vendor_product.destroy({
      where: { vepro_id: req.params.id },
    });
    res.status(201).json({ data: result, message: "Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//CRUD Stocks
const liststock = async (req, res) => {
  try {
    const result = await models.stocks.findAll();
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const stockbyId = async (req, res) => {
  try {
    const result = await models.stocks.findOne({
      where: { stock_id: req.params.id },
    });
    res.status(201).json({ data: result, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const insertstock = async (req, res) => {
  try {
    const {
      stock_name,
      stock_description,
      stock_quantity,
      stock_reorder_point,
      stock_used,
      stock_scrap,
      stock_size,
      stock_color,
    } = req.body;
    const result = await models.stocks.create({
      stock_name: stock_name,
      stock_description: stock_description,
      stock_quantity: stock_quantity,
      stock_reorder_point: stock_reorder_point,
      stock_used: stock_used,
      stock_scrap: stock_scrap,
      stock_size: stock_size,
      stock_color: stock_color,
    });
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatestocks = async (req, res) => {
  try {
    const {
      stock_name,
      stock_description,
      stock_quantity,
      stock_reorder_point,
      stock_used,
      stock_scrap,
      stock_size,
      stock_color,
    } = req.body;
    const result = await models.stocks.update(
      {
        stock_name: stock_name,
        stock_description: stock_description,
        stock_quantity: stock_quantity,
        stock_reorder_point: stock_reorder_point,
        stock_used: stock_used,
        stock_scrap: stock_scrap,
        stock_size: stock_size,
        stock_color: stock_color,
      },
      { where: { stock_id: req.params.id }, returning: true }
    );
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deletestocks = async (req, res) => {
  try {
    const result = await models.stocks.destroy({
      where: { stock_id: req.params.id },
    });
    res.status(201).json({ data: result, message: "Delete Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const liststock_photo = async (req, res) => {
  try {
    const result = await models.stock_photo.findAll();
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const uploadstockphoto = async (req, res) => {
  try {
    const { spho_primary, spho_url, spho_stock_id } = req.body;
    console.log(req.file);
    const result = await models.stock_photo.create({
      spho_thumbnail_filename: req.file.path,
      spho_photo_filename: req.file.originalname,
      spho_primary: spho_primary,
      spho_url: spho_url,
      spho_stock_id: spho_stock_id,
    });
    res.status(201).json({ data: result, message: "Insert Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletestockphoto = async (req, res) => {
  try {
    const query = `delete from purchase.stock_photo where purchase.stock_photo.spho_stock_id=1 
                  and purchase.stock_photo.spho_id 
                  not in (req.body.spho_id)`;
    const result = await sequelize.models.query(query);
    res.status(201).json({ data: result[0], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const pictstockphoto = async (req, res) => {
  try {
    const { filename } = req.params;
    const result = await models.stock_photo.findOne({
      where: { spho_photo_filename: filename },
    });
    //
    let mimetype = "";
    if (result.spho_photo_filename.match(/.(png|PNG)$/)) {
      mimetype = "image/png";
    } else {
      mimetype = "image/jpeg";
    }

    if (result) {
      const dirname = path.resolve();
      console.log(dirname, "ww");
      const fullfilepath = path.join(dirname, result.spho_thumbnail_filename);
      return res.type(mimetype).sendFile(fullfilepath);
    } else {
      return Promise.reject(new Error("Image does not exist"));
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const detailinfostock = async (req, res) => {
  try {
    const query = `select purchase.stock_detail.stod_barcode_number,purchase.stock_detail.stod_status,purchase.stock_detail.stod_id,
                    purchase.stock_detail.stod_notes,purchase.purchase_order_header.pohe_number,
                    hotel.facilities.faci_room_number from purchase.stock_detail join  purchase.purchase_order_header
                    on purchase.stock_detail.stod_pohe_id=purchase.purchase_order_header.pohe_id
                    join hotel.facilities on hotel.facilities.faci_id=purchase.stock_detail.stod_faci_id
                    join purchase.stocks on purchase.stocks.stock_id=purchase.stock_detail.stod_stock_id where purchase.stock_detail.stod_stock_id=${req.params.id}`;
    const result = await sequelize.query(query);
    res.status(201).json({ data: result[0], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const stockdetailbyId = async (req, res) => {
  try {
    const result = await models.stock_detail.findOne({
      where: { stod_id: req.params.id },
    });
    res.status(201).json({
      data: result,
      message: " Success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updatestockdetail = async (req, res) => {
  try {
    console.log(
      req.body.stod_status,
      req.body.stod_faci_id,
      req.params.idstock
    );
    const { stod_status, stod_faci_id } = req.body;
    const result = await models.stock_detail.update(
      {
        stod_status: stod_status,
        stod_faci_id: stod_faci_id,
      },
      { where: { stod_id: req.params.idstock }, returning: true }
    );
    res.status(201).json({
      data: result,
      message: " Success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listhotel = async (req, res) => {
  try {
    const result = await models.facilities.findAll();
    res.status(201).json({
      data: result,
      message: " Success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const listpurchasing = async (req, res) => {
  try {
    const query = `select * from purchase.stocks join purchase.stock_detail on
                    purchase.stock_detail.stod_stock_id=purchase.stocks.stock_id
                    join purchase.vendor_product on purchase.vendor_product.vepro_stock_id=purchase.stocks.stock_id
                    join purchase.vendor on purchase.vendor.vendor_entity_id=purchase.vendor_product.vepro_vendor_id
                    join purchase.purchase_order_header on purchase.stock_detail.stod_pohe_id=purchase.purchase_order_header.pohe_id
                    join purchase.purchase_order_detail on purchase.purchase_order_header.pohe_id=purchase.purchase_order_detail.pode_pohe_id`;
    const result = await sequelize.query(query);
    res.status(201).json({ data: result[0], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listgallery = async (req, res) => {
  try {
    const query = `select * from purchase.stocks join purchase.stock_detail on
                    purchase.stock_detail.stod_stock_id=purchase.stocks.stock_id
                    join purchase.vendor_product on purchase.vendor_product.vepro_stock_id=purchase.stocks.stock_id
                    join purchase.vendor on purchase.vendor.vendor_entity_id=purchase.vendor_product.vepro_vendor_id
                    join purchase.stock_photo on purchase.stocks.stock_id=purchase.stock_photo.spho_stock_id`;

    const result = await sequelize.query(query);
    res.status(201).json({ data: result[0], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const listgalleryphoto = async (req, res) => {
  try {
    const query = `select * from purchase.stocks 
                    join purchase.stock_photo on purchase.stocks.stock_id=purchase.stock_photo.spho_stock_id
                    join purchase.vendor_product on purchase.stocks.stock_id=purchase.vendor_product.vepro_stock_id
                    join purchase.vendor on purchase.vendor.vendor_entity_id=purchase.vendor_product.vepro_vendor_id`;

    const result = await sequelize.query(query);
    res.status(201).json({ data: result[0], message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const insertpurchaseorder = async (req, res) => {
  try {
    const {
      pohe_number,
      pohe_status,
      pohe_order_date,
      pohe_subtotal,
      pohe_tax,
      pohe_total_amount,
      pohe_refund,
      pohe_arrival_date,
      pohe_pay_type,
      pohe_vendor_id,
      pohe_emp_id,
      pode_order_qty,
      pode_price,
      pode_line_total,
      pode_received_qty,
      pode_rejected_qty,
      pode_stocked_qty,
      pode_modified_date,
      pode_stock_id,
      pode_pohe_id,
    } = req.body;
    const insertpurchaseheader = await models.purchase_order_header.create({
      pohe_number: pohe_number,
      pohe_status: pohe_status,
      pohe_order_date: pohe_order_date,
      pohe_subtotal: pohe_subtotal,
      pohe_tax: pohe_tax,
      pohe_total_amount: pohe_total_amount,
      pohe_refund: pohe_refund,
      pohe_arrival_date: pohe_arrival_date,
      pohe_pay_type: pohe_pay_type,
      pohe_vendor_id: pohe_vendor_id,
      pohe_emp_id: pohe_emp_id,
    });
    const insertpurchasedetail = await models.purchase_order_detail.create({
      pode_order_qty: pode_order_qty,
      pode_price: pode_price,
      pode_line_total: pode_line_total,
      pode_received_qty: pode_received_qty,
      pode_rejected_qty: pode_rejected_qty,
      pode_stocked_qty: pode_stocked_qty,
      pode_modified_date: pode_modified_date,
      pode_stock_id: pode_stock_id,
      pode_pohe_id: pode_pohe_id,
    });
    const result = { insertpurchaseheader, insertpurchasedetail };
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatestatuspurchase = async (req, res) => {
  try {
    const result = await models.purchase_order_header.update(
      {
        pohe_status: req.body.pohe_status,
      },
      { where: { pohe_id: req.body.pohe_id }, returning: true }
    );
    res.status(201).json({ data: result, message: "Update Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletepurchasestock = async (req, res) => {
  try {
    const deletpurchaseheader = await models.purchase_order_header.destroy({
      where: { pohe_id: req.body.pohe_id },
    });
    const deletepurchasedetail = await models.purchase_order_detail.destroy({
      where: { pode_pohe_id: req.body.pohe_id },
    });
    const result = { deletpurchaseheader, deletepurchasedetail };
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatepurchaseorderdetail = async (req, res) => {
  try {
    const {
      pode_stock_id,
      pode_order_qty,
      pode_received_qty,
      pode_rejected_qty,
      stod_barcode_number,
    } = req.body;
    const updateorderdetail = await models.purchase_order_detail.update(
      {
        pode_stock_id: pode_stock_id,
        pode_order_qty: pode_order_qty,
        pode_received_qty: pode_received_qty,
        pode_rejected_qty: pode_rejected_qty,
      },
      { where: { pode_pohe_id: req.body.pode_pohe_id } }
    );
    const updatestockdetail = await models.stock_detail.update(
      {
        stod_barcode_number: stod_barcode_number,
      },
      { where: { stod_stock_id: req.body.pode_stock_id } }
    );
    const result = { updateorderdetail, updatestockdetail };
    res.status(201).json({ data: result, message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  getvendor,
  getvendorbyId,
  insertvendor,
  deletevendor,
  updatevendor,
  getstokvendorproduct,
  insertstokvendorproduct,
  deletevendorproduct,
  insertstock,
  liststock,
  updatestocks,
  deletestocks,
  liststock_photo,
  uploadstockphoto,
  detailinfostock,
  updatestockdetail,
  listpurchasing,
  insertpurchaseorder,
  updatestatuspurchase,
  deletepurchasestock,
  updatepurchaseorderdetail,
  pictstockphoto,
  stockbyId,
  listhotel,
  stockdetailbyId,
  listgallery,
  listgalleryphoto,
};
