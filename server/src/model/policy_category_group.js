import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class policy_category_group extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    poca_poli_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'policy',
        key: 'poli_id'
      }
    },
    poca_cagro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category_group',
        key: 'cagro_id'
      }
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
    tableName: 'policy_category_group',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "policy_category_group_pkey",
        unique: true,
        fields: [
          { name: "poca_poli_id" },
          { name: "poca_cagro_id" },
        ]
      },
    ]
  });
  }
}
