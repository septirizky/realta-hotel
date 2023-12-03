import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_breakfast extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    usbr_borde_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'booking_order_detail',
        key: 'borde_id'
      }
    },
    usbr_modified_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    },
    usbr_total_vacant: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_breakfast',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "user_breakfast_pkey",
        unique: true,
        fields: [
          { name: "usbr_borde_id" },
          { name: "usbr_modified_date" },
        ]
      },
    ]
  });
  }
}
