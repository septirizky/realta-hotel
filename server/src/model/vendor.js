import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class vendor extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        vendor_entity_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        vendor_name: {
          type: DataTypes.STRING(55),
          allowNull: true,
        },
        vendor_active: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        vendor_priority: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        vendor_register_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        vendro_weburl: {
          type: DataTypes.STRING(1024),
          allowNull: true,
        },
        vendro_modified_date: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        tableName: "vendor",
        schema: "purchase",
        timestamps: false,
      }
    );
  }
}
