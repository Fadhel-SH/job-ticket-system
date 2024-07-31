const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Configure Passport
require('./config/passport')(passport);

// Connect to the database
require('./config/database')

// Connect to the auth
require('./config/auth')


// Middleware setup
app.set('view engine', 'ejs'); // Use EJS as the view engine
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Use the session secret from environment variables
  resave: false, // Do not save the session if unmodified
  saveUninitialized: false, // Do not save uninitialized sessions
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) // Store sessions in MongoDB
  // store: new MongoStore({ mongooseConnection: mongoose.connection }) // Store sessions in MongoDB
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use the method-override middleware to allow overriding the HTTP method in forms
app.use(methodOverride('_method'));

// Use flash messages
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up routes
app.use('/', require('./routes/index'));

// Make user available in all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});