import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_accounts extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    usac_entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'entity',
        key: 'entity_id'
      }
    },
    usac_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    usac_account_number: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "user_accounts_usac_account_number_key"
    },
    usac_saldo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    usac_type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    usac_expmonth: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    usac_expyear: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    usac_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    usac_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'user_accounts',
    schema: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "fki_user_accounts_usac_entity_id_fkey",
        fields: [
          { name: "usac_entity_id" },
        ]
      },
      {
        name: "user_accounts_pkey",
        unique: true,
        fields: [
          { name: "usac_id" },
        ]
      },
      {
        name: "user_accounts_usac_account_number_key",
        unique: true,
        fields: [
          { name: "usac_account_number" },
        ]
      },
    ]
  });
  }
}
