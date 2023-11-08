import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facilities extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    faci_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    faci_name: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    faci_description: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    faci_max_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    faci_measure_unit: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    faci_room_number: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    faci_startdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    faci_enddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    faci_low_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    faci_high_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    faci_rate_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    faci_discount: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    faci_tax_rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    faci_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    faci_cagro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category_group',
        key: 'cagro_id'
      }
    },
    faci_hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hotels',
        key: 'hotel_id'
      }
    }
  }, {
    sequelize,
    tableName: 'facilities',
    schema: 'hotel',
    timestamps: false,
    indexes: [
      {
        name: "facilities_pkey",
        unique: true,
        fields: [
          { name: "faci_id" },
        ]
      },
    ]
  });
  }
}
