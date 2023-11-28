import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class department extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    dept_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dept_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dept_modified_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'department',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "department_pkey",
        unique: true,
        fields: [
          { name: "dept_id" },
        ]
      },
    ]
  });
  }
}
