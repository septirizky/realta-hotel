import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class policy extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    poli_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    poli_name: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    poli_description: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'policy',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "policy_pkey",
        unique: true,
        fields: [
          { name: "poli_id" },
        ]
      },
    ]
  });
  }
}
