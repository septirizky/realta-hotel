import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class hotels extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hotel_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hotel_name: {
      type: DataTypes.STRING(85),
      allowNull: false
    },
    hotel_description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    hotel_rating_star: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    hotel_phonenumber: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    hotel_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    hotel_addr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'addr_id'
      }
    }
  }, {
    sequelize,
    tableName: 'hotels',
    schema: 'hotel',
    timestamps: false,
    indexes: [
      {
        name: "hotels_pkey",
        unique: true,
        fields: [
          { name: "hotel_id" },
        ]
      },
    ]
  });
  }
}
