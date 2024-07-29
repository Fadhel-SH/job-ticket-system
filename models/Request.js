const mongoose = require('mongoose');

// Define the schema for the Request model
const requestSchema = new mongoose.Schema({
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true }, // Reference to the Offer that the request is for, required
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who made the request, required
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' } // Status of the request, can be 'pending', 'accepted', or 'rejected', default is 'pending'
});

// Create the Request model using the defined schema
module.exports = mongoose.model('Request', requestSchema);