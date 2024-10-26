const User = require("./User");
const Book = require("./Book");
const GroupStatus = require("./GroupStatus");
const Vote = require("./Vote");

// User can have many books
User.hasMany(Book, {
  onDelete: 'CASCADE', // If a user is deleted, also delete their suggested books
});

// A book belongs to one user
Book.belongsTo(User, {
});

// User can vote for many books
User.belongsToMany(Book, {
  through: Vote, // Use the Vote model as the join table
  as: 'votedBooks', // Alias for accessing voted books
  foreignKey: 'user_id',
});

// Book can have many votes from users
Book.belongsToMany(User, {
  through: Vote, // Use the Vote model as the join table
  as: 'voters', // Alias for accessing users who voted for the book
  foreignKey: 'book_id',
});


Book.hasOne(GroupStatus);

GroupStatus.belongsTo(Book);

module.exports = { User, Book, GroupStatus, Vote }