const mongoose = require('mongoose');

// Load environment variables from .env file
// Connect to the database

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Connected to MongoDB to ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('Error connecting to Mongo', err);
  });


