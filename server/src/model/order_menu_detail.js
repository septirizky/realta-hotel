import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_menu_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    omde_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orme_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orme_qty: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    orme_subtotal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orme_discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    omde_orme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order_menus',
        key: 'orme_id'
      }
    },
    omde_reme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resto_menus',
        key: 'reme_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_menu_detail',
    schema: 'resto',
    timestamps: false,
    indexes: [
      {
        name: "order_menu_detail_pkey",
        unique: true,
        fields: [
          { name: "omde_id" },
        ]
      },
    ]
  });
  }
}
