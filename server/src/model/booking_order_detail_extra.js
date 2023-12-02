import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class booking_order_detail_extra extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    boex_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    boex_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boex_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    boex_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    boex_measure_unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    boex_borde_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'booking_order_detail',
        key: 'borde_id'
      }
    },
    boex_prit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'price_items',
        key: 'prit_id'
      }
    }
  }, {
    sequelize,
    tableName: 'booking_order_detail_extra',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "booking_order_detail_extra_pkey",
        unique: true,
        fields: [
          { name: "boex_id" },
        ]
      },
      {
        name: "fki_booking_order_detail_boex_prit_id_fkey",
        fields: [
          { name: "boex_prit_id" },
        ]
      },
    ]
  });
  }
}
