import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class special_offer_coupons extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    soco_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    soco_borde_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'booking_order_detail',
        key: 'borde_id'
      }
    },
    soco_spof_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'special_offers',
        key: 'spof_id'
      }
    }
  }, {
    sequelize,
    tableName: 'special_offer_coupons',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "special_offer_coupons_pkey",
        unique: true,
        fields: [
          { name: "soco_id" },
        ]
      },
    ]
  });
  }
}
