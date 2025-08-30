// models/expenseModel.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
