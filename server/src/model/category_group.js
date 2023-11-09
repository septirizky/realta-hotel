import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class category_group extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        cagro_id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        cagro_name: {
          type: DataTypes.STRING(25),
          allowNull: false,
          unique: "category_group_cagro_name_key",
        },
        cagro_type: {
          type: DataTypes.STRING(25),
          allowNull: false,
        },
        cagro_description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cagro_icon: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cagro_icon_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        createdat: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedat: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        tableName: "category_group",
        schema: "master",
        timestamps: false,
        indexes: [
          {
            name: "category_group_cagro_name_key",
            unique: true,
            fields: [{ name: "cagro_name" }],
          },
          {
            name: "category_group_pkey",
            unique: true,
            fields: [{ name: "cagro_id" }],
          },
        ],
      }
    );
  }
}
