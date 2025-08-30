// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Local MongoDB URI
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db('userData'); // Replace with your DB name
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

module.exports = { connectDB };
