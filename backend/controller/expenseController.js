// controllers/expenseController.js
const Expense = require('../models/expenseModel');

// Save new expense
exports.saveExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(200).send('Expense saved successfully');
  } catch (error) {
    res.status(500).send('Error saving expense');
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send('Error fetching expenses');
  }
};
