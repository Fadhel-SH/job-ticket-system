const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Configure Passport
require('./config/passport')(passport);

// Connect to the database
require('./config/database')


// Middleware setup
app.set('view engine', 'ejs'); // Use EJS as the view engine
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Use the session secret from environment variables
  resave: false, // Do not save the session if unmodified
  saveUninitialized: false, // Do not save uninitialized sessions
  store: new MongoStore({ mongooseConnection: mongoose.connection }) // Store sessions in MongoDB
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/', require('./routes/index'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});