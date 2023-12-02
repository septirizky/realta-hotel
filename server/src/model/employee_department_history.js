import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employee_department_history extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    edhi_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    edhi_emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    edhi_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    edhi_end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    edhi_modified_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    edhi_dept_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'department',
        key: 'dept_id'
      }
    },
    edhi_shift_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shift',
        key: 'shift_id'
      }
    }
  }, {
    sequelize,
    tableName: 'employee_department_history',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "employee_department_history_pkey",
        unique: true,
        fields: [
          { name: "edhi_id" },
          { name: "edhi_emp_id" },
        ]
      },
    ]
  });
  }
}
