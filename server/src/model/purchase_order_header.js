import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class purchase_order_header extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pohe_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pohe_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pohe_status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    pohe_order_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pohe_subtotal: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    pohe_tax: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    pohe_total_amount: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    pohe_refund: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    pohe_arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pohe_pay_type: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    pohe_vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendor',
        key: 'vendor_entity_id'
      }
    },
    pohe_emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'emp_id'
      }
    }
  }, {
    sequelize,
    tableName: 'purchase_order_header',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "fki_purchase_order_header_pohe_emp_id_fkey",
        fields: [
          { name: "pohe_emp_id" },
        ]
      },
      {
        name: "purchase_order_header_pkey",
        unique: true,
        fields: [
          { name: "pohe_id" },
        ]
      },
    ]
  });
  }
}
