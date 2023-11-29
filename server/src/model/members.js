import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class members extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    memb_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    memb_description: {
      type: DataTypes.STRING(100),
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
    tableName: 'members',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "members_pkey",
        unique: true,
        fields: [
          { name: "memb_name" },
        ]
      },
    ]
  });
  }
}
