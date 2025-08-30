import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './DebtReliefAssistant.css';

// Helper for INR formatting
const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);

const DebtReliefAssistant = () => {
  const navigate = useNavigate();

  // Define handleNavigate function to use the navigate function
  const handleNavigate = (path) => {
    navigate(path);
  };

  const [totalDebts, setTotalDebts] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    debtType: '',
    balance: '',
    minPay: '',
    dueDate: '',
    purpose: 'credit_card',
    interestRate: '',
    riskLevel: 'Medium'
  });

  const handleDebtChange = (e) => {
    const { name, value } = e.target;
    setNewDebt({
      ...newDebt,
      [name]: value
    });
  };

  const addDebt = () => {
    const { debtType, balance, minPay, interestRate } = newDebt;

    if (!debtType || parseFloat(balance) <= 0 || parseFloat(minPay) < 0 || parseFloat(interestRate) < 0) {
      alert("Please enter valid debt details.");
      return;
    }

    const newDebtBalance = parseFloat(balance);
    const currentTotal = debts.reduce((acc, d) => acc + d.balance, 0);
    const newTotal = currentTotal + newDebtBalance;

    if (parseFloat(totalDebts) > 0 && newTotal > parseFloat(totalDebts)) {
      alert(`Total debt exceeded! Your entered debts sum up to ₹${newTotal}, which is more than the total debts of ₹${totalDebts}.`);
      return;
    }

    setDebts([...debts, {
      ...newDebt,
      id: Date.now(),
      balance: newDebtBalance,
      minPay: parseFloat(minPay),
      interestRate: parseFloat(interestRate)
    }]);

    setNewDebt({
      debtType: '',
      balance: '',
      minPay: '',
      dueDate: '',
      purpose: 'credit_card',
      interestRate: '',
      riskLevel: 'Medium'
    });
  };

  const removeDebt = (id) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const generateSuggestions = () => {
    return debts.slice().sort((a, b) => {
      const riskOrder = { High: 3, Medium: 2, Low: 1 };
      return riskOrder[b.riskLevel] - riskOrder[a.riskLevel] ||
             b.interestRate - a.interestRate;
    }).map(debt => {
      let suggestion = '';
      if (debt.riskLevel === 'High') {
        suggestion = `Prioritize ${debt.debtType} (${debt.purpose}) - High risk debt with ${debt.interestRate}% interest`;
      } else if (debt.interestRate > 15) {
        suggestion = `Accelerate payments for ${debt.debtType} - High interest rate (${debt.interestRate}%)`;
      } else {
        suggestion = `Maintain minimum payments for ${debt.debtType} - Low risk`;
      }
      return { ...debt, suggestion };
    });
  };

  const suggestions = generateSuggestions();

  let dtiValue = monthlyIncome
    ? ((Number(totalDebts) / (Number(monthlyIncome) * 12)) * 100)
    : 0;
  let dtiBadge = '';
  if (monthlyIncome) {
    dtiBadge = dtiValue < 20 ? 'Low' : dtiValue <= 36 ? 'Moderate' : 'High';
  }

  return (
    <div>
      <header className="header">
        <div className="logo"><img src="logo1.png" alt="Logo" /></div>
        <nav className="modules">
          <span onClick={() => handleNavigate('/debt-relief')}>Debt Relief Assistant</span>
          <span onClick={() => handleNavigate('/expense-tracker')}>Expense Tracker</span>
          <span onClick={() => window.location.href = 'https://www.practicalmoneyskills.com/en'}>Financial Education</span>
          <span onClick={() => handleNavigate('/retirement-planning')}>Retirement Planning</span>
          <span onClick={() => handleNavigate('/profile')}>Profile</span>
        </nav>
      </header>

      <div className="debt-module">
        <div className="snapshot-cards">
          <div className="snapshot-card total-debts">
            <div className="card-label">Total Debts</div>
            <input
              type="number"
              className="card-input"
              placeholder="₹0"
              min="0"
              value={totalDebts}
              onChange={e => setTotalDebts(e.target.value)}
            />
          </div>
          <div className="snapshot-card dti">
            <div className="card-label">Debt-to-Income Ratio</div>
            <div className="card-value">
              {monthlyIncome
                ? dtiValue.toFixed(1)
                : 0
              }%
            </div>
            <div className="dti-badge">{dtiBadge}</div>
          </div>
          <div className="snapshot-card income">
            <div className="card-label">Monthly Income</div>
            <input
              type="number"
              className="card-input"
              placeholder="₹0"
              min="0"
              value={monthlyIncome}
              onChange={e => setMonthlyIncome(e.target.value)}
            />
          </div>
          <div className="snapshot-card credit-score">
            <div className="card-label">Credit Score</div>
            <input
              type="number"
              className="card-input"
              placeholder="Score"
              min="0"
              value={creditScore}
              onChange={e => setCreditScore(e.target.value)}
            />
          </div>
        </div>

        <form className="input-section add-debt-panel" onSubmit={e => e.preventDefault()}>
          <h2>Add Debt</h2>
          <div className="input-group">
            <label htmlFor="debtType">Debt Type:</label>
            <select
              id="debtType"
              name="debtType"
              value={newDebt.debtType}
              onChange={handleDebtChange}
              required
            >
              <option value="">-- Select Debt Type --</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Student Loan">Student Loan</option>
              <option value="Auto Loan">Auto Loan</option>
              <option value="Mortgage">Mortgage</option>
              <option value="Medical">Medical</option>
              <option value="Small Business">Small Business</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="balance">Balance (₹):</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={newDebt.balance}
              onChange={handleDebtChange}
              min="0"
            />
          </div>
          <div className="input-group">
            <label htmlFor="minPay">Minimum Payment (₹):</label>
            <input
              type="number"
              id="minPay"
              name="minPay"
              value={newDebt.minPay}
              onChange={handleDebtChange}
              min="0"
            />
          </div>
          <div className="input-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={newDebt.dueDate}
              onChange={handleDebtChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="purpose">Purpose:</label>
            <select id="purpose" name="purpose" value={newDebt.purpose} onChange={handleDebtChange}>
              <option value="credit_card">Credit Card</option>
              <option value="debt_consolidation">Debt Consolidation</option>
              <option value="educational">Educational</option>
              <option value="home_improvement">Home Improvement</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="interestRate">Interest Rate (%):</label>
            <input
              type="number"
              step="0.1"
              id="interestRate"
              name="interestRate"
              value={newDebt.interestRate}
              onChange={handleDebtChange}
              min="0"
            />
          </div>
          <div className="input-group">
            <label htmlFor="riskLevel">Risk Level:</label>
            <select id="riskLevel" name="riskLevel" value={newDebt.riskLevel} onChange={handleDebtChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button className="add-debt-btn" type="button" onClick={addDebt}>Add Debt</button>
        </form>

        <div className="table-panel">
          <table className="debt-table">
            <thead>
              <tr>
                <th>Debt Type</th>
                <th>Balance</th>
                <th>Min Pay</th>
                <th>Due Date</th>
                <th>Purpose</th>
                <th>Interest</th>
                <th>Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt) => (
                <tr key={debt.id}>
                  <td>{debt.debtType}</td>
                  <td>{formatINR(debt.balance)}</td>
                  <td>{formatINR(debt.minPay)}</td>
                  <td>{debt.dueDate ? new Date(debt.dueDate).toLocaleDateString() : ''}</td>
                  <td>{debt.purpose}</td>
                  <td>{debt.interestRate.toFixed(2)}%</td>
                  <td>{debt.riskLevel}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeDebt(debt.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {suggestions.length > 0 && (
  <div className="suggestions-container">
    <h2>Debt Payment Suggestions</h2>
    <ul className="suggestion-list">
      {suggestions.map((debt, index) => (
        <li key={debt.id} className={`suggestion-item ${debt.riskLevel.toLowerCase()}`}>
          <strong>{debt.debtType}:</strong> {debt.suggestion}
        </li>
      ))}
    </ul>
  </div>
)}

      </div>
    </div>
  );
};

export default DebtReliefAssistant;
