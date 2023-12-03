import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class joinmenu extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    reme_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reme_name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    reme_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    reme_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    reme_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    orme_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orme_qty: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    orme_subtotal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orme_tax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    remp_thumbnail_filename: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'joinmenu',
    schema: 'resto',
    timestamps: false
  });
  }
}
