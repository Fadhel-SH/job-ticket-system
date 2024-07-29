const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username field, required and unique
  password: { type: String, required: true }, // Password field, required
  role: { type: String, enum: ['admin', 'user', 'customer'], required: true } // Role field, required and can be one of 'admin', 'user', or 'customer'
});

// Middleware to hash the password before saving a new user
userSchema.pre('save', async function(next) {
  // Check if the password has been modified
  if (this.isModified('password')) {
    // Hash the password using bcrypt with a cost factor of 10
    this.password = await bcrypt.hash(this.password, 10);
  }
  // Call the next middleware function
  next();
});

// Method to compare a candidate password with the stored password
userSchema.methods.comparePassword = function(candidatePassword) {
  // Use bcrypt to compare the candidate password with the stored password
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model using the defined schema
module.exports = mongoose.model('User', userSchema);