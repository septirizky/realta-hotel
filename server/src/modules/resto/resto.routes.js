import { Router } from "express";

import multer from 'multer';

import menuConstroller from "./menu.constroller.js";
import medetailController from "./medetail.controller.js";

// import restoConstroller from "./menu.constroller.js";

const storage = multer.diskStorage({
    destination: (req, files, cb) => {
      cb(null, './src/public/uploads'); // Direktori tempat file akan disimpan
    },
    filename: (req, files, cb) => {
        // const ext = file.originalname.split('.').pop();
        const new_name =files.originalname; 
        cb(null, new_name);
    },
  });


const fileFilter = (req, files, cb) => {
    if (files.mimetype === 'image/jpeg' || files.mimetype === 'image/png' || files.mimetype === 'image/jpg') {
      // Terima file dengan tipe MIME 'image/jpeg' atau 'image/png'
      console.log(req.headers['content-length']);
      if (req.headers['content-length'] < 190000) {
        cb(null, true);  
      }
      else{
        cb('Ukuran terlalu besar', false);
      }
      
    } else {
      console.log(files.originalname);
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
restoRouters.post('/resto/photo',upload.any('files'),menuConstroller.createMenuPhoto)
restoRouters.delete('/resto/photo/:remp_id/:image',menuConstroller.deleteMenuPhoto)
restoRouters.patch('/resto/photo/:remp_id',upload.any('files'),menuConstroller.addMenuPhoto )

restoRouters.post('/resto/menu',medetailController.getMenuDetail)
restoRouters.delete('/resto/menu/:reme_id',medetailController.deleteMenuDetail)

export default restoRouters;