const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
