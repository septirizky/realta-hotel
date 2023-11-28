import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class provinces extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    prov_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prov_name: {
      type: DataTypes.STRING(85),
      allowNull: false
    },
    prov_country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'country',
        key: 'country_id'
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
    tableName: 'provinces',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "provinces_pkey",
        unique: true,
        fields: [
          { name: "prov_id" },
        ]
      },
    ]
  });
  }
}
