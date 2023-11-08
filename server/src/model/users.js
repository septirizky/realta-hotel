import _sequelize from 'sequelize';

const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_full_name: {
      type: DataTypes.STRING(55),
      allowNull: true,
      defaultValue: "guest1..n"
    },
    user_type: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    user_company_name: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    user_email: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    user_phone_number: {
      type: DataTypes.STRING(25),
      allowNull: true,
      unique: "users_user_phone_number_key"
    },
    user_modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'users',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_user_phone_number_key",
        unique: true,
        fields: [
          { name: "user_phone_number" },
        ]
      },
    ]
  });
  }
}
