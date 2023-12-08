import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class work_order_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    wode_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wode_task_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wode_status: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    wode_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    wode_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    wode_notes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wode_emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'emp_id'
      }
    },
    wode_seta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_task',
        key: 'seta_id'
      }
    },
    wode_faci_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facilities',
        key: 'faci_id'
      }
    },
    wode_woro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'work_orders',
        key: 'woro_id'
      }
    }
  }, {
    sequelize,
    tableName: 'work_order_detail',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "fki_work_order_detail_wode_faci_id_fkey",
        fields: [
          { name: "wode_faci_id" },
        ]
      },
      {
        name: "fki_work_order_detail_wode_seta_id_fkey",
        fields: [
          { name: "wode_seta_id" },
        ]
      },
      {
        name: "work_order_detail_pkey",
        unique: true,
        fields: [
          { name: "wode_id" },
        ]
      },
    ]
  });
  }
}
