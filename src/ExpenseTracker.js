  import React, { useState } from 'react';
  import './ExpenseTracker.css';
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

  const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([
      { category: 'Entertainment', method: 'Credit Card', amount: 7950, date: '2025-05-03' },
      { category: 'Rent', method: 'UPI', amount: 15000, date: '2025-05-01' },
      { category: 'Healthcare', method: 'Cash', amount: 7000, date: '2025-05-05' },
      { category: 'Eating_Out', method: 'Digital Wallet', amount: 1900, date: '2025-05-07' },
      { category: 'Groceries', method: 'UPI', amount: 2500, date: '2025-05-04' },
      { category: 'Transport', method: 'Cash', amount: 500, date: '2025-05-06' },
      { category: 'Entertainment', method: 'Credit Card', amount: 2000, date: '2025-05-15' },
      { category: 'Groceries', method: 'Credit Card', amount: 1300, date: '2025-05-15' },
      { category: 'Eating_Out', method: 'Digital Wallet', amount: 2000, date: '2025-05-17' },
    ]);

    const categoryLimits = {
      Entertainment: 8000,
      Rent: 40000,
      Healthcare: 5000,
      Eating_Out: 5000,
      Groceries: 5000,
      Transport: 2000,
    };

    const [formData, setFormData] = useState({
      category: '',
      method: '',
      amount: '',
      date: '',
      income: '',
      age: '',
      cityTier: '',
      occupation: ''
    });

    const [showSummary, setShowSummary] = useState(false);
    const [showPrediction, setShowPrediction] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const handleNavigate = (path) => {
      window.location.href = path;
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddExpense = () => {
    const { category, method, amount, date } = formData;

    // Field-specific blank checks
    if (!category) {
      alert('Please select a category.');
      return;
    }
    if (!method) {
      alert('Please select a payment method.');
      return;
    }
    if (!amount) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!date) {
      alert('Please select a date.');
      return;
    }

    const newAmount = parseFloat(amount);

    // Check for negative or zero amount
    if (isNaN(newAmount) || newAmount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    const currentCategoryTotal = expenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);

    const updatedTotal = currentCategoryTotal + newAmount;

    // Check if updated total exceeds the upper limit
    if (categoryLimits[category] && updatedTotal > categoryLimits[category]) {
      alert(`Warning: Your total spending in "${category}" has exceeded the limit of ₹${categoryLimits[category]}.`);
    }

    const newExpense = {
      category,
      method,
      amount: newAmount,
      date
    };

    setExpenses(prevExpenses => [...prevExpenses, newExpense]);

    setFormData(prevFormData => ({
      ...prevFormData,
      category: '',
      method: '',
      amount: '',
      date: ''
    }));
  };

    const handleProceed = () => {
      const { income, age, cityTier, occupation } = formData;
      if (!income || !age || !cityTier || !occupation) {
        alert('Please fill all user information fields.');
        return;
      }

      setShowSummary(true);
      setShowPrediction(false);
      setPrediction(null);
    };

    const handlePredict = () => {
      const filteredExpenses = expenses.filter(exp => exp.category !== 'Rent');
      if (filteredExpenses.length === 0) {
        alert('No expenses data available excluding Rent for prediction.');
        return;
      }

      const categoryTotals = {};
      filteredExpenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
      });

      const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
      const highest = sortedCategories[0];
      const lowest = sortedCategories[sortedCategories.length - 1];

      const advice = `Consider reducing your spending on ${highest[0]}.`;
      const quotes = [
        "A penny saved is a penny earned.",
        "Budgeting is telling your money where to go instead of wondering where it went.",
        "Small savings add up to big rewards."
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      setPrediction({
        highestCategory: highest[0],
        highestAmount: highest[1],
        lowestCategory: lowest[0],
        lowestAmount: lowest[1],
        advice,
        quote: randomQuote
      });

      setShowPrediction(true);
    };
const RED_THRESHOLD_RATIO = 0.5; // 50% of limit

const getChartData = () => {
  const categoryMap = {};
  expenses.forEach(exp => {
    categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
  });

  return Object.entries(categoryMap).map(([category, amount]) => {
    const limit = categoryLimits[category] || 0;
    let withinLimit = Math.min(amount, limit);
    let excess = Math.max(0, amount - limit);
    let excessOrange = 0;
    let excessRed = 0;

    if (excess > limit * RED_THRESHOLD_RATIO) {
      excessOrange = limit * RED_THRESHOLD_RATIO;
      excessRed = excess - excessOrange;
    } else {
      excessOrange = excess;
      excessRed = 0;
    }

    return {
      category,
      withinLimit,
      excessOrange,
      excessRed,
    };
  });
};

    const getTotalSpentThisMonth = () => {
      const currentMonth = '2025-05';
      return expenses
        .filter(exp => exp.date.startsWith(currentMonth))
        .reduce((sum, exp) => sum + exp.amount, 0);
    };

    const getHighestSpentThisMonth = () => {
      const currentMonth = '2025-05';
      const filtered = expenses.filter(exp => exp.date.startsWith(currentMonth));
      if (filtered.length === 0) return 0;
      return Math.max(...filtered.map(exp => exp.amount));
    };

    const getMostUsedPaymentMethod = () => {
      const methodCount = {};
      expenses.forEach(exp => {
        methodCount[exp.method] = (methodCount[exp.method] || 0) + 1;
      });

      const sortedMethods = Object.entries(methodCount).sort((a, b) => b[1] - a[1]);
      return sortedMethods.length ? sortedMethods[0][0] : 'N/A';
    };

    return (
      <div>
        <header className="header">
          <div className="logo"><img src="logo1.png" alt="Logo" /></div>
          <nav className="modules">
            <span onClick={() => handleNavigate('/debt-relief')}>Debt Relief Assistant</span>
            <span onClick={() => handleNavigate('/expense-tracker')}>Expense Tracker</span>
            <span onClick={() =>window.location.href = 'https://www.practicalmoneyskills.com/en'}>Financial Education</span>
            <span onClick={() => handleNavigate('/retirement-planning')}>Retirement Planning</span>
            <span onClick={() => handleNavigate('/profile')}>Profile</span>
          </nav>
        </header>

        <div className="container">
          <h2 className="section-title">Expense Tracker</h2>

          <div className="information-form">
            <h3>User Information</h3>
            <div className="form-row">
              <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="Let us know your income" />
              <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age for personalization" />
            </div>
            <div className="form-row">
              <select name="cityTier" value={formData.cityTier} onChange={handleChange}>
                <option value="">Select City Tier</option>
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Tier 3">Tier 3</option>
              </select>
              <select name="occupation" value={formData.occupation} onChange={handleChange}>
                <option value="">Select Occupation</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Retired">Retired</option>
                <option value="Professional">Professional</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <button className="add-btn" onClick={handleProceed}>Proceed 🚀</button>
          </div>

          <div className="add-expense-container">
            <h3>Add New Expense</h3>
            <div className="form-row">
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Rent">Rent</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Eating_Out">Eating Out</option>
                <option value="Groceries">Groceries</option>
                <option value="Transport">Transport</option>
              </select>
              <select name="method" value={formData.method} onChange={handleChange}>
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Digital Wallet">Digital Wallet</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div className="form-row">
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <button className="add-btn" onClick={handleAddExpense}>Add Expense</button>
          </div>

          {showSummary && (
            <>
              <div className="summary-cards" style={{ display: 'flex', gap: '20px', margin: '30px 0' }}>
                <div className="card summary-card">
                  <h4>Total Spent This Month</h4>
                  <p>₹ {getTotalSpentThisMonth()}</p>
                </div>
                <div className="card summary-card">
                  <h4>Highest Spent This Month</h4>
                  <p>₹ {getHighestSpentThisMonth()}</p>
                </div>
                <div className="card summary-card">
                  <h4>Most Used Payment Mode</h4>
                  <p>{getMostUsedPaymentMethod()}</p>
                </div>
              </div>

              <div className="expense-table-container">
                <h3>Expenses List</h3>
                <table className="expense-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Method</th>
                      <th>Amount (₹)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((exp, index) => (
                      <tr key={index}>
                        <td>{exp.category}</td>
                        <td>{exp.method}</td>
                        <td>{exp.amount.toFixed(2)}</td>
                        <td>{exp.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="predict-section" style={{ textAlign: 'center', margin: '20px 0' }}>
                <button className="predict-btn" onClick={handlePredict}>Predict Next Month Spending 🔮</button>
              </div>

              {showPrediction && prediction && (
                <div className="prediction-cards" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
                  <div className="card prediction-card">
                    <h4>Highest Predicted Spending</h4>
                    <p>{prediction.highestCategory}</p>
                    <p>₹ {prediction.highestAmount.toFixed(2)}</p>
                  </div>
                  <div className="card prediction-card">
                    <h4>Lowest Predicted Spending</h4>
                    <p>{prediction.lowestCategory}</p>
                    <p>₹ {prediction.lowestAmount.toFixed(2)}</p>
                  </div>
                  <div className="card prediction-card advice">
                    <h4>Advice</h4>
                    <p>{prediction.advice}</p>
                    <p><i>{prediction.quote}</i></p>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px' }}>
    <div style={{ width: '200%', maxWidth: '900px', height: 340 }}>
      <h3 style={{ textAlign: 'center' }}>Spending by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={getChartData()}
    barCategoryGap="30%"
    margin={{ top: 10, right: 50, left: 0, bottom: 50 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    {/* Blue bar for within limit */}
    <Bar
      dataKey="withinLimit"
      stackId="a"
      fill="#007bff" // blue
      name="Within Limit"
      isAnimationActive={false}
    />
    {/* Orange bar for excess (up to threshold) */}
    <Bar
      dataKey="excessOrange"
      stackId="a"
      fill="#ffa500" // orange
      name="Excess (Orange)"
      isAnimationActive={false}
    />
    {/* Red bar for excess beyond threshold */}
    <Bar
      dataKey="excessRed"
      stackId="a"
      fill="#ff4500" // red
      name="Excess (Red)"
      isAnimationActive={false}
    />
  </BarChart>
</ResponsiveContainer>

    </div>
  </div>

            </>
          )}
        </div>
      </div>
    );
  };

  export default ExpenseTracker;
