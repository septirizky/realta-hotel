import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class booking_orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    boor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    boor_order_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    boor_order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    boor_arrival_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    boor_total_room: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    boor_total_guest: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    boor_discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    boor_total_tax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    boor_total_amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    boor_down_payment: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    boor_pay_type: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    boor_is_paid: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    boor_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    boor_cardnumber: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    boor_member_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    boor_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    boor_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    boor_hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hotels',
        key: 'hotel_id'
      }
    }
  }, {
    sequelize,
    tableName: 'booking_orders',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "booking_orders_pkey",
        unique: true,
        fields: [
          { name: "boor_id" },
        ]
      },
      {
        name: "fki_booking_order_boor_user_id_fkey",
        fields: [
          { name: "boor_user_id" },
        ]
      },
      {
        name: "fki_booking_order_hotel_id_fkey",
        fields: [
          { name: "boor_hotel_id" },
        ]
      },
    ]
  });
  }
}
