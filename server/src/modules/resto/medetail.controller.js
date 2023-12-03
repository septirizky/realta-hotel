import models from "../../model/init-models.js";
import { err } from "./errorh/err.js";
import { Op } from "sequelize";

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

//   export const hotel = async (req, res) => {
//     try {
//       const { keyword } = req.body;
//       const result = await models.hotels.findAll({
//         where: {
//           hotel_name: {
//             [Op.iLike]: %${keyword ? keyword : ""}%,
//           },
//         },
//         // include: {
//         //   model: models.address,
//         //   as: "hotel_addr",
//         //   required: true,
//         // },
//       });
//       return res
//         .status(200)
//         .json({ data: result, message: "berhasil tampil hotel" });
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   };

export default {
    getMenuDetail
}