import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class geography_columns extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    f_table_catalog: {
      type: "NAME",
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
    f_geography_column: {
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
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'geography_columns',
    schema: 'public',
    timestamps: false
  });
  }
}
