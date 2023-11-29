import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class address extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    addr_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addr_line_1: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    addr_line_2: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    addr_postal_code: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    addr_spatial_location: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    addr_city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'city',
        key: 'city_id'
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
    tableName: 'address',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "address_pkey",
        unique: true,
        fields: [
          { name: "addr_id" },
        ]
      },
      {
        name: "fki_addr_city_id_fkey",
        fields: [
          { name: "addr_city_id" },
        ]
      },
    ]
  });
  }
}
