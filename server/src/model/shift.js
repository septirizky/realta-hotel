import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class shift extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    shift_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shift_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "shift_shift_name_unique"
    },
    shift_start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    shift_end_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shift',
    schema: 'hr',
    timestamps: false,
    indexes: [
      {
        name: "shift_pkey",
        unique: true,
        fields: [
          { name: "shift_id" },
        ]
      },
      {
        name: "shift_shift_name_unique",
        unique: true,
        fields: [
          { name: "shift_name" },
        ]
      },
    ]
  });
  }
}
