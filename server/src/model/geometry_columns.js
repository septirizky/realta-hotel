import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class geometry_columns extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    f_table_catalog: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    f_table_schema: {
      type: "NAME",
      allowNull: true
    },
    f_table_name: {
      type: "NAME",
      allowNull: true
    },
    f_geometry_column: {
      type: "NAME",
      allowNull: true
    },
    coord_dimension: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    srid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'geometry_columns',
    schema: 'public',
    timestamps: false
  });
  }
}
