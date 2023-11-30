import { Router } from "express";
import {
  city,
  hotel,
  hotelAdd,
  hotelUpdate,
  hotelDelete,
  hotelPhoto,
  facilities,
  facilitiesAdd,
  facilitiesUpdate,
  facilitiesDelete,
  category,
} from "./hotel.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/modules/hotel/photo"); // Direktori tempat file akan disimpan
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const new_name = Math.round(Math.random() * 1e9) + "." + ext;
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
    if (req.headers["content-length"] < 190000) {
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

const hotelRouters = Router();

hotelRouters.post(
  "/hotel/facilities/facility_photos",
  upload.single("file"),
  hotelPhoto
);

hotelRouters.post("/hotel", hotel);
hotelRouters.post("/hotel/add", hotelAdd);
hotelRouters.put("/hotel/:hotel_id", hotelUpdate);
hotelRouters.delete("/hotel/:hotel_id", hotelDelete);

hotelRouters.get("/city", city);
hotelRouters.get("/category", category);

hotelRouters.get("/hotel/facilities/:hotel_id", facilities);
hotelRouters.post("/hotel/facilities", facilitiesAdd);
hotelRouters.put("/hotel/facilities/:faci_id", facilitiesUpdate);
hotelRouters.delete("/hotel/facilities/:faci_id", facilitiesDelete);

export default hotelRouters;
