import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class payment_transaction extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    patr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    patr_trx_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "payment_transaction_patr_trx_number_patr_trx_number_ref_key"
    },
    patr_debet: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    patr_credit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    patr_type: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    patr_note: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    patr_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    patr_order_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    patr_source_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patr_target_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patr_trx_number_ref: {
      type: DataTypes.STRING(55),
      allowNull: true,
      unique: "payment_transaction_patr_trx_number_patr_trx_number_ref_key"
    },
    patr_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payment_transaction',
    schema: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "payment_transaction_patr_trx_number_patr_trx_number_ref_key",
        unique: true,
        fields: [
          { name: "patr_trx_number" },
          { name: "patr_trx_number_ref" },
        ]
      },
      {
        name: "payment_transaction_pkey",
        unique: true,
        fields: [
          { name: "patr_id" },
        ]
      },
    ]
  });
  }
}
