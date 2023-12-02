import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bank extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    bank_entity_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'entity',
        key: 'entity_id'
      }
    },
    bank_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: "bank_bank_code_key"
    },
    bank_name: {
      type: DataTypes.STRING(55),
      allowNull: true,
      unique: "bank_bank_name_key"
    },
    bank_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'bank',
    schema: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "bank_bank_code_key",
        unique: true,
        fields: [
          { name: "bank_code" },
        ]
      },
      {
        name: "bank_bank_name_key",
        unique: true,
        fields: [
          { name: "bank_name" },
        ]
      },
      {
        name: "bank_pkey",
        unique: true,
        fields: [
          { name: "bank_entity_id" },
        ]
      },
    ]
  });
  }
}
