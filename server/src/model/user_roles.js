import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_roles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    usro_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    usro_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_roles',
    schema: 'users',
    timestamps: false,
    indexes: [
      {
        name: "user_roles_pkey",
        unique: true,
        fields: [
          { name: "usro_user_id" },
          { name: "usro_role_id" },
        ]
      },
    ]
  });
  }
}
