import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class user_members extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        usme_user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "users",
            key: "user_id",
          },
        },
        usme_memb_name: {
          type: DataTypes.STRING(15),
          allowNull: true,
          references: {
            model: "members",
            key: "memb_name",
          },
        },
        usme_promote_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        usme_points: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        usme_type: {
          type: DataTypes.STRING(15),
          allowNull: true,
          defaultValue: "expired",
        },
      },
      {
        sequelize,
        tableName: "user_members",
        schema: "users",
        timestamps: false,
        indexes: [
          {
            name: "user_members_pkey",
            unique: true,
            fields: [{ name: "usme_user_id" }],
          },
        ],
      }
    );
  }
}
