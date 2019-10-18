const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  id: Number,
  fullName: String,
  email: String,
  departmentId: Number,
  createdAt: Date,
  updatedAt: Date,
})(class User {
});


module.exports = User;