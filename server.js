const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/dhanSootraDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use expense routes
app.use('/api', expenseRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
