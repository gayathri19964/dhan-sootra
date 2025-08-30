// client/src/components/ExpenseForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = () => {
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      category,
      paymentMethod,
      amount,
      date,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/expenses/add-expense', expenseData);
      alert(response.data.message);  // Show success message
    } catch (error) {
      alert('Failed to save or update expense');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Enter Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <br />
        <label>Payment Method</label>
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        />
        <br />
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <button type="submit">Save or Update Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
