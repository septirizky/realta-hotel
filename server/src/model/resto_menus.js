import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class resto_menus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    reme_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reme_faci_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'faci_id'
      }
    },
    reme_name: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    reme_description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reme_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reme_status: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    reme_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    reme_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'resto_menus',
    schema: 'resto',
    timestamps: false,
    indexes: [
      {
        name: "resto_menus_pkey",
        unique: true,
        fields: [
          { name: "reme_id" },
        ]
      },
    ]
  });
  }
}
