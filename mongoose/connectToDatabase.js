const mongoose = require('mongoose');

async function connectToDatabase(databaseName) {
  const uri = `mongodb://localhost:27017/${databaseName}`;
  
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to MongoDB ${databaseName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
