const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Offer = require('../models/Offer');
const Request = require('../models/Request');

// Home route
// This route handles the main page of the application
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Register route
// These routes handle user registration
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.redirect('/register');
  }
});

// Login route
// These routes handle user authentication using Passport.js
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// Logout route
// This route handles user logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  res.redirect('/');
});
});

// Offers routes
// These routes handle the creation, viewing, and management of offers
router.get('/offers', async (req, res) => {
  const offers = await Offer.find().populate('createdBy');
  res.render('offers', { offers });
});

router.post('/offers', async (req, res) => {
  const { title, description, price, bestOffer } = req.body;
  const offer = new Offer({ title, description, price, bestOffer, createdBy: req.user._id });
  await offer.save();
  res.redirect('/offers');
});

router.get('/offers/:id', async (req, res) => {
  const offer = await Offer.findById(req.params.id).populate('createdBy').populate('requestedBy');
  res.render('offerDetails', { offer });
});

router.put('/offers/:id', async (req, res) => {
  await Offer.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/offers/${req.params.id}`);
});

router.delete('/offers/:id', async (req, res) => {
  await Offer.findByIdAndDelete(req.params.id);
  res.redirect('/offers');
});

// Requests routes
// These routes handle the creation and management of requests for offers
router.post('/offers/:id/requests', async (req, res) => {
  const request = new Request({ offerId: req.params.id, userId: req.user._id });
  await request.save();
  res.redirect(`/offers/${req.params.id}`);
});

router.get('/requests', async (req, res) => {
  const requests = await Request.find({ userId: req.user._id }).populate('offerId');
  res.render('requests', { requests });
});

router.put('/requests/:id', async (req, res) => {
  await Request.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/requests');
});

module.exports = router;