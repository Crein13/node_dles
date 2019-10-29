const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  id: Number,
  fullName: String,
  email: String,
  departmentId: Number,
  isLoggedIn: Boolean,
  loginAt: Date,
  logoutAt: Date,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date,
})(class User {});

module.exports = User;
