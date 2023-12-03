import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employee extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    emp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emp_national_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emp_birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    emp_marital_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    emp_gender: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    emp_hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    emp_salaried_flag: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    emp_vacation_hours: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    emp_sickleave_hours: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    emp_current_flag: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    emp_photo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emp_modified_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    emp_emp_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'emp_id'
      }
    },
    emp_joro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'job_role',
        key: 'joro_id'
      }
    },
    emp_fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "employee_pkey",
        unique: true,
        fields: [
          { name: "emp_id" },
        ]
      },
    ]
  });
  }
}
