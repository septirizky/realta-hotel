import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class special_offers extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    spof_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spof_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spof_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    spof_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spof_discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spof_start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    spof_end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    spof_min_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spof_max_qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spof_modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'special_offers',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "special_offers_pkey",
        unique: true,
        fields: [
          { name: "spof_id" },
        ]
      },
    ]
  });
  }
}
