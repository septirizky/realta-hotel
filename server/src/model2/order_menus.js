import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_menus extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    orme_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orme_order_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    orme_order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    orme_total_item: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    orme_total_discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orme_total_amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    orme_pay_type: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    orme_cardnumber: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    orme_is_paid: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    orme_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    orme_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_menus',
    schema: 'resto',
    timestamps: false,
    indexes: [
      {
        name: "order_menus_pkey",
        unique: true,
        fields: [
          { name: "orme_id" },
        ]
      },
    ]
  });
  }
}
