import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class vendor_product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    vepro_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vepro_qty_stocked: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vepro_qty_remaining: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vepro_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    vepro_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'stock_id'
      }
    },
    vepro_vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendor',
        key: 'vendor_entity_id'
      }
    }
  }, {
    sequelize,
    tableName: 'vendor_product',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "vendor_product_pkey",
        unique: true,
        fields: [
          { name: "vepro_id" },
        ]
      },
    ]
  });
  }
}
