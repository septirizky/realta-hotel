import { Router } from "express";
import purchase from "./purchase.controller.js";
import multer from "multer";
const purchaseRouters = Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./src/modules/purchase/uploads/`); //here you can place your destination path
  },
  fileFilter: async (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(null, true);
  },
});
const upload = multer({ storage: storage });
//Vendor
purchaseRouters.get("/vendor", purchase.getvendor);
purchaseRouters.post("/insertvendor", purchase.insertvendor);
purchaseRouters.delete("/deletevendor/:id", purchase.deletevendor);
purchaseRouters.post("/updatevendor", purchase.updatevendor);
purchaseRouters.get("/vendorbyId/:id", purchase.getvendorbyId);

//Stock
purchaseRouters.get("/liststocks", purchase.liststock);
purchaseRouters.post("/insertstocks", purchase.insertstock);
purchaseRouters.post("/updatestocks/:id", purchase.updatestocks);
purchaseRouters.delete("/deletestocks/:id", purchase.deletestocks);

//stock_photo
purchaseRouters.get("/liststockphoto", purchase.liststock_photo);
purchaseRouters.post(
  "/uploadstockphoto",
  upload.single("imagephoto"),
  purchase.uploadstockphoto
);
purchaseRouters.get("/pictstockphoto/:filename", purchase.pictstockphoto);

//stock_detail
purchaseRouters.get("/detailinfostock", purchase.detailinfostock);
purchaseRouters.post("/updatestockdetail", purchase.updatestockdetail);

//Vendor Product
purchaseRouters.get(
  "/liststockvendorproduct/:id",
  purchase.getstokvendorproduct
);
purchaseRouters.post(
  "/insertstockvendorproduct",
  purchase.insertstokvendorproduct
);
purchaseRouters.delete(
  "/deletevendorproduct/:id",
  purchase.deletevendorproduct
);

//purchasing_order
purchaseRouters.get("/listpurchasegallery", purchase.listpurchasing);
purchaseRouters.post("/updatestatuspurchase", purchase.updatestatuspurchase);
purchaseRouters.delete("/deletepurchaseorder", purchase.deletepurchasestock);
purchaseRouters.post(
  "/updatepurchasedetail",
  purchase.updatepurchaseorderdetail
);
export default purchaseRouters;
