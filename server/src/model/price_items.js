import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class price_items extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    prit_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prit_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: "price_items_prit_name_key"
    },
    prit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    prit_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prit_type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    prit_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
    },
    prit_icon: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prit_icon_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'price_items',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "price_items_pkey",
        unique: true,
        fields: [
          { name: "prit_id" },
        ]
      },
      {
        name: "price_items_prit_name_key",
        unique: true,
        fields: [
          { name: "prit_name" },
        ]
      },
    ]
  });
  }
}
