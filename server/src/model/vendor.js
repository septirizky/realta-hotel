import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class vendor extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    vendor_entity_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'entity',
        key: 'entity_id'
      }
    },
    vendor_name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    vendor_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vendor_priority: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vendor_register_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    vendro_weburl: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    vendro_modified_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vendor',
    schema: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "fki_vendor_entity_id_fkey",
        fields: [
          { name: "vendor_entity_id" },
        ]
      },
      {
        name: "vendor_pkey",
        unique: true,
        fields: [
          { name: "vendor_entity_id" },
        ]
      },
    ]
  });
  }
}
