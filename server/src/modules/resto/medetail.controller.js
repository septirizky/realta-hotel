import models from "../../model/init-models.js";
import { err } from "./errorh/err.js";
import { Op } from "sequelize";
import fs from 'fs'

const getMenuDetail = async (req, res) => {
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
        include: {
          model: models.resto_menu_photos,
          as: "resto_menu_photos",
          required: true,
        },

      });
      return res
        .status(200)
        .json({ data: result, message: "berhasil tampil menudetail" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const deleteMenuDetail = async (req,res)=>{
    try {
      const {reme_id} = req.params
      const result2 = await models.resto_menu_photos.findAll({
        where:{
          remp_reme_id : reme_id
        }
      })
      result2.map((value)=> {
        const url = `./src/public/uploads/${value.remp_photo_filename}`
        fs.unlinkSync(url)
      }) 

      const result = await models.resto_menus.destroy({
        where:{
          reme_id:reme_id
        },
        include: {
          model: models.resto_menu_photos,
          as: "resto_menu_photos",
          required: true,
        },
      })
  
      return res
        .status(200)
        .json({data:result, message:"Berhasil Menghapus"})
    } catch (error) {
      return res.status(400).json({message:error.message})
    }
  }

export default {
    getMenuDetail,
    deleteMenuDetail
}