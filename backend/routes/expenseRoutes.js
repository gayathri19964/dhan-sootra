// routes/expenseRoutes.js
const express = require('express');
const { saveExpense, getExpenses } = require('../controllers/expenseController');
const router = express.Router();

// POST route for saving expense
router.post('/expenses', saveExpense);

// GET route for fetching expenses
router.get('/expenses', getExpenses);

module.exports = router;
