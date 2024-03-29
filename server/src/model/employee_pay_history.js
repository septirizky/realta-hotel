import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employee_pay_history extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ephi_emp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'emp_id'
      }
    },
    ephi_rate_salary: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ephi_pay_frequence: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ephi_modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ephi_rate_exchange_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'employee_pay_history',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "employee_pay_history_ephi_rate_exchange_date_ephi_emp_id",
        unique: true,
        fields: [
          { name: "ephi_emp_id" },
          { name: "ephi_rate_exchange_date" },
        ]
      },
      {
        name: "fki_employee_pay_history_ephi_emp_id_fkey",
        fields: [
          { name: "ephi_emp_id" },
        ]
      },
    ]
  });
  }
}
