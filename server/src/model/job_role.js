import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class job_role extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    joro_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    joro_name: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    joro_modified_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_role',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "job_role_pkey",
        unique: true,
        fields: [
          { name: "joro_id" },
        ]
      },
    ]
  });
  }
}
