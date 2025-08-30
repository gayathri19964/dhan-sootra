const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI and client setup
const uri = 'mongodb://localhost:27017';  // Change if you use Atlas or a different host
const client = new MongoClient(uri);
const dbName = 'your_database_name'; // Change this to your actual database name

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const usersCollection = db.collection('details');

    // Login endpoint
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await usersCollection.findOne({ email, password });

      if (user) {
        return res.json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
}

main();
