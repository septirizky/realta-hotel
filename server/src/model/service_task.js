import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class service_task extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    seta_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seta_name: {
      type: DataTypes.STRING(85),
      allowNull: false,
      unique: "service_task_seta_name_key"
    },
    seta_seq: {
      type: DataTypes.SMALLINT,
      allowNull: false
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
    tableName: 'service_task',
    schema: 'master',
    timestamps: false,
    indexes: [
      {
        name: "service_task_pkey",
        unique: true,
        fields: [
          { name: "seta_id" },
        ]
      },
      {
        name: "service_task_seta_name_key",
        unique: true,
        fields: [
          { name: "seta_name" },
        ]
      },
    ]
  });
  }
}
