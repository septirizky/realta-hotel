import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class hotel_reviews extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hore_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hore_user_review: {
      type: DataTypes.STRING(125),
      allowNull: false
    },
    hore_rating: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    hore_created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    hore_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    hore_hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hotels',
        key: 'hotel_id'
      }
    }
  }, {
    sequelize,
    tableName: 'hotel_reviews',
    schema: 'hotel',
    timestamps: false,
    indexes: [
      {
        name: "hotel_reviews_pkey",
        unique: true,
        fields: [
          { name: "hore_id" },
        ]
      },
    ]
  });
  }
}
