import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class work_orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    woro_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    woro_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    woro_status: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    woro_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'work_orders',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "fki_work_orders_woro_user_id_fkey",
        fields: [
          { name: "woro_user_id" },
        ]
      },
      {
        name: "work_order_pkey",
        unique: true,
        fields: [
          { name: "woro_id" },
        ]
      },
    ]
  });
  }
}
