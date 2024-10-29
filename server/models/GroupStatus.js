const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GroupStatus extends Model { };

GroupStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    meet_date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.TIME
    },
    location: {
      type: DataTypes.STRING(150)
    },
    current_book: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false, // No automatically-generated timestamps
    freezeTableName: true, // Prevents pluralization
    underscored: true,
    modelName: 'group_status'
  }
);

module.exports = GroupStatus;