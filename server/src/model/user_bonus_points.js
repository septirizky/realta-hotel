import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_bonus_points extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ubpo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ubpo_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    ubpo_total_points: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ubpo_bonus_type: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    ubpo_created_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_bonus_points',
    schema: 'users',
    timestamps: false,
    indexes: [
      {
        name: "user_bonus_points_pkey",
        unique: true,
        fields: [
          { name: "ubpo_id" },
        ]
      },
    ]
  });
  }
}
