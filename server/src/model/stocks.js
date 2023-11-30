import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stocks extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    stock_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stock_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stock_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stock_quantity: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    stock_reorder_point: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    stock_used: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    stock_scrap: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    stock_size: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    stock_color: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    stock_modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stocks',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "stocks_pkey",
        unique: true,
        fields: [
          { name: "stock_id" },
        ]
      },
    ]
  });
  }
}
