import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stock_photo extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    spho_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spho_thumbnail_filename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    spho_photo_filename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    spho_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    spho_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    spho_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'stock_id'
      }
    }
  }, {
    sequelize,
    tableName: 'stock_photo',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "stock_photo_pkey",
        unique: true,
        fields: [
          { name: "spho_id" },
        ]
      },
    ]
  });
  }
}
