import { Router } from "express";

import multer from 'multer';

import menuConstroller from "./menu.constroller.js";
import medetailController from "./medetail.controller.js";

// import restoConstroller from "./menu.constroller.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/public/photoes'); // Direktori tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        // const ext = file.originalname.split('.').pop();
        const new_name =file.originalname; 
        cb(null, new_name);
    },
  });


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      // Terima file dengan tipe MIME 'image/jpeg' atau 'image/png'
      console.log(req.headers['content-length']);
      if (req.headers['content-length'] < 190000) {
        cb(null, true);  
      }
      else{
        cb('Ukuran terlalu besar', false);
      }
      
    } else {
      console.log(file.originalname);
      const error = new Error('File type is not supported');
      error.status = 400;
      
      cb(error);
      // Tolak file dengan tipe MIME lainnya
      //cb('Ekstensi File Bukan Gambar', false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, });


const restoRouters = Router();

restoRouters.post('/resto',menuConstroller.getRestoMenu)
restoRouters.post('/restom',menuConstroller.createRestoMenu)
restoRouters.patch('/resto/:reme_id',menuConstroller.addRestoMenu)
restoRouters.delete('/resto/:reme_id',menuConstroller.deleteRestoMenu)

restoRouters.get('/resto/photo',menuConstroller.getMenuPhoto)
restoRouters.post('/resto/photo',upload.single('file'),menuConstroller.createMenuPhoto)
restoRouters.delete('/resto/photo/:remp_id/:image',menuConstroller.deleteMenuPhoto)
restoRouters.patch('/resto/photo/:remp_id',upload.single('file'),menuConstroller.addMenuPhoto )

restoRouters.post('/resto/menu',medetailController.getMenuDetail)
export default restoRouters;