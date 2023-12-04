import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class purchase_order_detail extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pode_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pode_order_qty: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    pode_price: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    pode_line_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pode_received_qty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pode_rejected_qty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pode_stocked_qty: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pode_modified_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pode_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'stock_id'
      }
    },
    pode_pohe_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'purchase_order_header',
        key: 'pohe_id'
      }
    }
  }, {
    sequelize,
    tableName: 'purchase_order_detail',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "purchase_order_detail_pkey",
        unique: true,
        fields: [
          { name: "pode_id" },
        ]
      },
    ]
  });
  }
}
