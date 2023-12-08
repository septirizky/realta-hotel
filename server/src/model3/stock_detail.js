import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stock_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    stod_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stod_barcode_number: {
      type: DataTypes.STRING(225),
      allowNull: true,
      unique: "stock_detail_stod_barcode_number_key"
    },
    stod_status: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    stod_notes: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    stod_faci_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'faci_id'
      }
    },
    stod_pohe_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'purchase_order_header',
        key: 'pohe_id'
      }
    },
    stod_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'stock_id'
      }
    }
  }, {
    sequelize,
    tableName: 'stock_detail',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "fki_stock_detail_stod_faci_id_fkey",
        fields: [
          { name: "stod_faci_id" },
        ]
      },
      {
        name: "stock_detail_pkey",
        unique: true,
        fields: [
          { name: "stod_id" },
        ]
      },
      {
        name: "stock_detail_stod_barcode_number_key",
        unique: true,
        fields: [
          { name: "stod_barcode_number" },
        ]
      },
    ]
  });
  }
}
