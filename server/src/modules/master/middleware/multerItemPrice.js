import multer from "multer";
import md5 from "blueimp-md5";

const allowedFileExt = ["jpg", "jpeg", "png"];
const filefilterOpt = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  const maxsize = 1 * 1024 * 1024;

  if (allowedFileExt.includes(ext.toLowerCase())) {
    if (req.headers["content-length"] > maxsize) {
      req.errorvalidatefile = "Hanya boleh masukkan gambar kurang dari 1 MB!";
      cb(null, false);
    } else {
      cb(null, true);
    }
  } else {
    req.errorvalidatefile = "Hanya boleh berformat .jpg, .jpeg, .png!";
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/assets/item_price");
  },
  filename: function (req, file, cb) {
    const configsuffix = md5(Math.round(Math.random() * 1e9));
    const ext = file.originalname.split(".").pop();
    cb(null, configsuffix + "." + ext);
  },
});

const uploadItemPrice = multer({
  storage: storage,
  fileFilter: filefilterOpt,
});

export default uploadItemPrice;
