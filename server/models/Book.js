const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING(25),
    },
    description: {
      type: DataTypes.TEXT,
    },
    user_ref: {
      type: DataTypes.STRING(50),
      references: {
        model: "user",
        key: "username",
      },
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false, // No automatically-generated timestamps
    freezeTableName: true, // Prevents pluralization
    underscored: true,
    modelName: "book",
  }
);

module.exports = Book;
