const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Offer = require('../models/Offer');
const Request = require('../models/Request');
const { ensureAuthenticated } = require('../config/auth');
var bcrypt = require('bcryptjs');

// // Home route
// router.get('/', (req, res) => {
//   res.render('index', { user: req.user });
// });

// Home route
router.get('/', async (req, res) => {
  const offers = await Offer.find().populate('createdBy');
  res.render('index', { user: req.user, offers });
});

// routes/index.js
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// Register route
router.get('/register', (req, res) => {
  res.render('register', { user: req.user });
});

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  let errors = [];

  if (!username || !password || !role) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, user: req.user });
  } else {
    try {
      let user = await User.findOne({ username: username });

      if (user) {
        errors.push({ msg: 'Username already exists' });
        res.render('register', { errors, user: req.user });
      } else {
        user = new User({ username, password, role });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
      }
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Error registering user');
      res.redirect('/register');
    }
  }
});


// Login route
router.get('/login', (req, res, next) => {
  res.render('login', { user: req.user });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/offers',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  });
});

// Offers routes
router.get('/offers', ensureAuthenticated, async (req, res) => {
  const offers = await Offer.find().populate('createdBy');
  res.render('offers', { user: req.user, offers });
});

router.post('/offers', ensureAuthenticated, async (req, res) => {
  const { title, description, price, bestOffer } = req.body;
  const offer = new Offer({ title, description, price, bestOffer, createdBy: req.user._id });
  await offer.save();
  req.flash('success_msg', 'Offer created');
  res.redirect('/offers');
});

router.get('/offers/:id', ensureAuthenticated, async (req, res) => {
  const offer = await Offer.findById(req.params.id).populate('createdBy').populate('requestedBy');
  res.render('offerDetails', { user: req.user, offer });
});

router.put('/offers/:id', ensureAuthenticated, async (req, res) => {
  await Offer.findByIdAndUpdate(req.params.id, req.body);
  req.flash('success_msg', 'Offer updated');
  res.redirect(`/offers/${req.params.id}`);
});

router.delete('/offers/:id', ensureAuthenticated, async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Offer deleted');
  res.redirect('/offers');
});

// Requests routes
router.post('/offers/:id/requests', ensureAuthenticated, async (req, res) => {
  const request = new Request({ offerId: req.params.id, userId: req.user._id });
  await request.save();
  req.flash('success_msg', 'Request created');
  res.redirect(`/offers/${req.params.id}`);
});

router.get('/requests', ensureAuthenticated, async (req, res) => {
  const requests = await Request.find({ userId: req.user._id }).populate('offerId');
  res.render('requests', { user: req.user, requests });
});

router.put('/requests/:id', ensureAuthenticated, async (req, res) => {
  await Request.findByIdAndUpdate(req.params.id, req.body);
  req.flash('success_msg', 'Request updated');
  res.redirect('/requests');
});

module.exports = router;
