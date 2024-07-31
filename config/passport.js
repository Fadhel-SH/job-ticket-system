// Require the User model
const User = require('../models/User');

// Require the LocalStrategy from the passport-local package
const LocalStrategy = require('passport-local').Strategy;

// Require the bcrypt library for password hashing
const bcrypt = require('bcryptjs');

// Export a function that configures the Passport.js authentication strategy
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        console.log("User from mongo:", user);
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: 'That username is not registered' });
        }

        console.log('Entered Password:', password);
        console.log('Stored Hashed Password:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log("Password matched");
          return done(null, user);
        } else {
          console.log("Password did not match");
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        console.error('Error during authentication:', err);
        return done(err);
      }
    }))

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
