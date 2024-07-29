const mongoose = require('mongoose');

// Define the schema for the Offer model
const offerSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the offer, required
  description: { type: String, required: true }, // Description of the offer, required
  price: { type: Number }, // Price of the offer
  bestOffer: { type: Boolean, default: false }, // Flag to indicate if this is the best offer, default is false
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User who created the offer
  requestedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of Users who have requested the offer
});

// Create the Offer model using the defined schema
module.exports = mongoose.model('Offer', offerSchema);