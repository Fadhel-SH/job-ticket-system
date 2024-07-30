// Require the User model
const User = require('../models/User');

// Require the LocalStrategy from the passport-local package
const LocalStrategy = require('passport-local').Strategy;

// Require the bcrypt library for password hashing
const bcrypt = require('bcryptjs');

// Export a function that configures the Passport.js authentication strategy
module.exports = function(passport) {
  // Configure the local strategy for Passport.js
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Find the user by their email
        const user = await User.findOne({ email: email });

        // If the user is not found, return a false user and an error message
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords match, return the user object
        if (isMatch) {
          return done(null, user);
        // If the passwords don't match, return a false user and an error message
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        // If there's an error, log it and return the error
        console.error(err);
        return done(err);
      }
    })
  );

  // Serialize the user object to store in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user object from the session
  passport.deserializeUser(async (id, done) => {
    try {
      // Find the user by their ID and return the user object
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      // If there's an error, return the error
      done(err, null);
    }
  });
};
