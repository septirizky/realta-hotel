import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class booking_order_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    borde_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    borde_boor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'booking_orders',
        key: 'boor_id'
      }
    },
    borde_checkin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    borde_checkout: {
      type: DataTypes.DATE,
      allowNull: true
    },
    borde_adults: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    borde_kids: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    borde_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    borde_extra: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    borde_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    borde_tax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    borde_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    borde_faci_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'faci_id'
      }
    },
    borde_subtotal_with_tax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'booking_order_detail',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "booking_order_detail_pkey",
        unique: true,
        fields: [
          { name: "borde_id" },
        ]
      },
    ]
  });
  }
}
