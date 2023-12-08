import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class country extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    country_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: "country_country_name_key"
    },
    country_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'regions',
        key: 'region_code'
      }
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'country',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "country_country_name_key",
        unique: true,
        fields: [
          { name: "country_name" },
        ]
      },
      {
        name: "country_pkey",
        unique: true,
        fields: [
          { name: "country_id" },
        ]
      },
    ]
  });
  }
}
