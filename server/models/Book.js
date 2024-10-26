const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model { };

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
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING
    },
    user_ref: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    timestamps: false, // No automatically-generated timestamps
    freezeTableName: true, // Prevents pluralization
    underscored: true,
    modelName: 'book'
  }
);

module.exports = Book;