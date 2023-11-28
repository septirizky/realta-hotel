import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_profiles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    uspro_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uspro_national_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    uspro_birt_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    uspro_job_title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    uspro_marital_status: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    uspro_gender: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    uspra_addr_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'addr_id'
      }
    },
    uspro_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_profiles',
    schema: 'users',
    timestamps: false,
    indexes: [
      {
        name: "user_profiles_pkey",
        unique: true,
        fields: [
          { name: "uspro_id" },
        ]
      },
    ]
  });
  }
}
