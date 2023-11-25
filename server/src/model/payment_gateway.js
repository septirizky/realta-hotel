import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class payment_gateway extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    paga_entity_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'entity',
        key: 'entity_id'
      }
    },
    paga_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "payment_gateway_paga_code"
    },
    paga_name: {
      type: DataTypes.STRING(55),
      allowNull: true,
      unique: "payment_gateway_paga_name"
    },
    paga_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'payment_gateway',
    schema: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "payment_gateway_paga_code",
        unique: true,
        fields: [
          { name: "paga_code" },
        ]
      },
      {
        name: "payment_gateway_paga_name",
        unique: true,
        fields: [
          { name: "paga_name" },
        ]
      },
      {
        name: "payment_gateway_pkey",
        unique: true,
        fields: [
          { name: "paga_entity_id" },
        ]
      },
    ]
  });
  }
}
