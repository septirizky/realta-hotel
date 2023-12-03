import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class joinahotel extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hotel_name: {
      type: DataTypes.STRING(85),
      allowNull: true
    },
    hotel_rating_star: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    hotel_phonenumber: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    hotel_modified_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    faci_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    faci_name: {
      type: DataTypes.STRING(125),
      allowNull: true
    },
    faci_room_number: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    faci_measure_unit: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    faci_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    faci_enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    faci_low_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    faci_high_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    faci_discount: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    faci_rate_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    faci_tax_rate: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    fapho_thumbnail_filename: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'joinahotel',
    schema: 'hotel',
    timestamps: false
  });
  }
}
