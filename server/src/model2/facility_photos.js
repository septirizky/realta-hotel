import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facility_photos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    fapho_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fapho_faci_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'faci_id'
      }
    },
    fapho_thumbnail_filename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fapho_photo_filename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fapho_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fapho_url: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    fapho_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'facility_photos',
    schema: 'hotel',
    timestamps: false,
    indexes: [
      {
        name: "facility_photos_pkey",
        unique: true,
        fields: [
          { name: "fapho_id" },
        ]
      },
    ]
  });
  }
}
