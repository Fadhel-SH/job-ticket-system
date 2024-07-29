const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  // Use the local strategy for user authentication
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        // If no user is found, return a false user and an error message
        return done(null, false, { message: 'No user with that username' });
      }
      // Compare the provided password with the stored password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        // If the passwords don't match, return a false user and an error message
        return done(null, false, { message: 'Password incorrect' });
      }
      // If the user is found and the password is correct, return the user
      return done(null, user);
    } catch (error) {
      // If any other error occurs, return the error
      return done(error);
    }
  }));

  // Serialize the user to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user from the session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};