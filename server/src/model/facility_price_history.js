import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class facility_price_history extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    faph_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    faph_faci_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facilities',
        key: 'faci_id'
      }
    },
    faph_startdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    faph_enddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    faph_low_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    faph_high_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    faph_rate_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    faph_discount: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    faph_tax_rate: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    faph_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    faph_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'facility_price_history',
    schema: 'hotel',
    timestamps: false,
    indexes: [
      {
        name: "facility_price_history_pkey",
        unique: true,
        fields: [
          { name: "faph_id" },
        ]
      },
    ]
  });
  }
}
