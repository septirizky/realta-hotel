import { Router } from "express";
import {
  hotel,
  hotelAdd,
  hotelUpdate,
  hotelDelete,
  facilities,
  facilitiesAdd,
  facilitiesUpdate,
  facilitiesDelete,
  city,
  category,
  getPhoto,
  uploadFaciPhoto,
  photoDelete,
  facilityHistory, facilitiesAll,
} from "./hotel.controller.js";
import multer from "multer";
import path from "path";

const hotelRouters = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/uploads"); // Direktori tempat file akan disimpan
  },
  filename: (req, file, cb) => {
    const new_name = `${Date.now() + path.extname(file.originalname)}`;
    cb(null, new_name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    // Terima file dengan tipe MIME 'image/jpeg' atau 'image/png'
    console.log(req.headers["content-length"]);
    if (req.headers["content-length"] < 19000000) {
      cb(null, true);
    } else {
      cb("Ukuran terlalu besar", false);
    }
  } else {
    console.log(file.originalname);
    const error = new Error("File type is not supported");
    error.status = 400;

    cb(error);
    // Tolak file dengan tipe MIME lainnya
    //cb('Ekstensi File Bukan Gambar', false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

hotelRouters.post("/hotel", hotel);
hotelRouters.post("/hotel/add", hotelAdd);
hotelRouters.put("/hotel/:hotel_id", hotelUpdate);
hotelRouters.delete("/hotel/:hotel_id", hotelDelete);

hotelRouters.get("/city", city);
hotelRouters.get("/category", category);

hotelRouters.get("/hotel/facilities/photo/:faci_id", getPhoto);
hotelRouters.post(
  "/hotel/facilities/photo",
  upload.any("files"),
  uploadFaciPhoto
);
hotelRouters.delete("/hotel/facilities/photo/:fapho_id", photoDelete);

hotelRouters.get("/hotel/facilities/facility_history", facilityHistory);

hotelRouters.get("/hotel/facilities/:hotel_id", facilities);
hotelRouters.get("/hotel/facilities", facilitiesAll);
hotelRouters.post("/hotel/facilities", facilitiesAdd);
hotelRouters.put("/hotel/facilities/:faci_id", facilitiesUpdate);
hotelRouters.delete("/hotel/facilities/:faci_id", facilitiesDelete);

export default hotelRouters;
