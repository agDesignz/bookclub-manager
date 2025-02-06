import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

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
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "book",
        key: "id",
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

export default Meeting;
