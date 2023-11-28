import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_password extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    uspa_user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    uspa_passwordhash: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    uspa_passwordsalt: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_password',
    schema: 'users',
    timestamps: false,
    indexes: [
      {
        name: "user_password_pkey",
        unique: true,
        fields: [
          { name: "uspa_user_id" },
        ]
      },
    ]
  });
  }
}
