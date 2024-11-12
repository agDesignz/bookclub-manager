const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Meeting extends Model {}

Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    time: {
      type: DataTypes.TIME,
    },
    location: {
      type: DataTypes.STRING(150),
    },
    bookSelection: {
      type: DataTypes.STRING(200),
      references: {
        model: "book",
        key: "title",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    timestamps: false, // No automatically-generated timestamps
    freezeTableName: true, // Prevents pluralization
    underscored: true,
    modelName: "meeting",
  }
);

module.exports = Meeting;
