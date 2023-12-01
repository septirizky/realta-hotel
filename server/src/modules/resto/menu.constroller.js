import models from "../../model/init-models.js";
import { err } from "./errorh/err.js";
import { sequelize } from "../../model/init-models.js";
import {Op} from "sequelize"
import fs from 'fs'

 const getRestoMenu = async (req, res) => {
  try {
    const { keyword } = req.body;
    const result = await models.resto_menus.findAll({
      order:[
        ['reme_id','ASC'],
      ],
      where: {
        reme_name: {
          [Op.iLike]:`%${keyword ? keyword : ""}%`,
        },
      },
    });
    return res
      .status(200)
      .json({ data: result, message: "berhasil tampil menu" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const createRestoMenu = async (req,res) => {
  try {
    const {
      res_menu,
      description,
      price,
      type,
      stats
    } = req.body

    const result= await models.resto_menus.create({
      reme_name : res_menu,
      reme_description : description,
      reme_price : price,
      reme_status : stats,
      reme_type : type,
      reme_modified_date: new Date(),
    })

    return res
      .status(200)
      .json({data:result, message:"Berhasil menambahkan data"})
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

const addRestoMenu = async (req,res)=>{
  try {
    const {reme_id} = req.params
    const {
      rem_id,
      res_menu,
      description,
      price,
      type,
      stats
    } = req.body
    const result = await models.resto_menus.update(
      {
        reme_id : rem_id,
        reme_name : res_menu,
        reme_description : description,
        reme_price : price,
        reme_status : stats,
        reme_type : type,
        reme_modified_date: new Date(),
      },
      {
      where:{
        reme_id:reme_id
      }, returning: true
    })

    return res
      .status(200)
      .json({data:result, message:"Berhasil Update"})
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

const deleteRestoMenu = async (req,res)=>{
  try {
    const {reme_id} = req.params

    const result = await models.resto_menus.destroy({
      where:{
        reme_id:reme_id
      }
    })

    return res
      .status(200)
      .json({data:result, message:"Berhasil Menghapus"})
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

const getMenuPhoto = async (req, res) => {
  try {
    const result = await models.resto_menu_photos.findAll({schema: 'resto'});
    return res.status(200).json({ data: result, message: "Berhasil" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createMenuPhoto = async(req,res) => {
  try {
    if(req.file) {
      const {thuname,primary,reme_id} = req.body
      const url = `${req.protocol}://${req.get('host')}/photoes/${req.file.filename}`;
      const result = await models.resto_menu_photos.create(
        {
          remp_thumbnail_filename : thuname,
          remp_photo_filename:req.file.filename,
          remp_prime : primary,
          remp_url : url,
          remp_reme_id : reme_id
        },
        {returning : true}
      );
      res.send(err(result,200,'sukses'));
    }
    else {
      res.send(err(400,'Upload Foto Terlebih Dahulu'))
    }
  } catch (error) {
    res.send(err(400, error.message))
  }
}

const deleteMenuPhoto = async (req,res)=>{
  try {
    const {remp_id} = req.params;
    const image = req.params.image;
    const url = `./src/public/photoes/${image}`
    fs.unlinkSync(url)
    const result = await models.resto_menu_photos.destroy({
      where:{
        remp_id:remp_id
      }
    })
    return res
      .status(200)
      .json({data:result, message:"Berhasil Menghapus"})
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

const addMenuPhoto = async(req,res) => {
  try {
    if(req.file) {
      const {remp_id} = req.params
      const {thuname,primary,reme_id} = req.body
      const path = `./src/public/photoes/${req.body.image}`;
      fs.unlinkSync(path)
      const url = `${req.protocol}://${req.get('host')}/photoes/${req.file.filename}`;
      // fs.unlinkSync(url)
      const result = await models.resto_menu_photos.update(
        {
          remp_thumbnail_filename : thuname,
          remp_photo_filename:req.file.filename,
          remp_prime : primary,
          remp_url : url,
          remp_reme_id : reme_id
        },
        {where:{remp_id:remp_id},returning : true}
      );
      res.send(err(result,200,'sukses'));
    }
    else {
      const {remp_id} = req.params
      const {thuname,primary,reme_id} = req.body
      const result = await models.resto_menu_photos.update({
        remp_thumbnail_filename : thuname,
        remp_photo_filename : primary,
        remp_reme_id : reme_id
    }, {where:{remp_id:remp_id}, returning:true})
      res.send(err(result,400,'Sukses'))
    }
  } catch (error) {
    res.send(err(400, error.message))
  }
}

// const createMenuDetail = async (req,res) => {
//   try {
//     const {
//       res_menu,
//       description,
//       price,
//       type,
//       stats
//     } = req.body

//     const result= await models.resto_menus.create({
//       reme_name : res_menu,
//       reme_description : description,
//       reme_price : price,
//       reme_status : stats,
//       reme_type : type,
//       reme_modified_date: new Date(),
//     })

//     return res
//       .status(200)
//       .json({data:result, message:"Berhasil menambahkan data"})
//   } catch (error) {
//     return res.status(400).json({message:error.message})
//   }
// }




// export const searchMenu = async (req, res) => {
//   try {
//     const query = `select * from resto.searchmenu('${req.params.reme_name}')`;
//     const result = await sequelize.query(query);
//     return res
//       .status(200)
//       .json({ data: result, message: "Berhasil" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };




export default {
  getRestoMenu,
  createRestoMenu,
  addRestoMenu,
  deleteRestoMenu,
  getMenuPhoto,
  createMenuPhoto,
  deleteMenuPhoto,
  addMenuPhoto
  // restomenu_Delete,
  // restomenu_Update,
  // searchMenu,
  // menuphotos_GET,
  // menuphotos_Post
}