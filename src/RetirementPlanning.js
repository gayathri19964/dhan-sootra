import React, { useState } from "react";
import "./RetirementPlanning.css";

function RetirementPlanning() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [corpusGoal, setCorpusGoal] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(""); // 🔹 New state for validation error

  // ✅ Navigation handler
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const calculateMonthlySavings = () => {
    const ageNow = parseInt(currentAge);
    const ageRetire = parseInt(retirementAge);
    const goal = parseFloat(corpusGoal.replace(/,/g, ""));

    // 🔹 Input validation
    if (!ageNow || !ageRetire || !goal || ageRetire <= ageNow) {
      setError("Please enter valid age and retirement details.");
      setResult(null);
      return;
    }

    if (ageRetire > 100) {
      setError("Please enter a valid retirement age ");
      setResult(null);
      return;
    }

    setError(""); // Clear previous error
    const r = 0.08 / 12;
    const t = (ageRetire - ageNow) * 12;
    const factor = (Math.pow(1 + r, t) - 1) / r;
    const monthlySavings = goal / factor;

    setResult(Math.round(monthlySavings));

    // Suggest investments based on savings range
    if (monthlySavings < 5000) {
      setSuggestions([
        "Invest in SIPs (Systematic Investment Plans) of mutual funds",
        "Use recurring deposit accounts in banks"
      ]);
    } else if (monthlySavings < 20000) {
      setSuggestions([
        "Consider investing in diversified equity mutual funds",
        "Allocate funds toward residential property investments"
      ]);
    } else {
      setSuggestions([
        "Explore direct investment in individual stocks",
        "Consider commercial real estate or retirement pension plans"
      ]);
    }
  };

  return (
    <div className="retirement-wrapper">
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

      <div className="container">
        <h2>Retirement Planning</h2>

        <label>Current Age</label>
        <input
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(e.target.value)}
        />

        <label>Retirement Age</label>
        <input
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(e.target.value)}
        />

        <label>Desired Retirement Corpus (₹)</label>
        <input
          type="text"
          value={corpusGoal}
          onChange={(e) => setCorpusGoal(e.target.value)}
          placeholder="₹1,00,00,000"
        />

        <button onClick={calculateMonthlySavings}>Calculate</button>

        {/* 🔹 Show error message */}
        {error && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</div>}

        {result && !error && (
          <>
            <div className="result">
              You need to save ₹{result.toLocaleString()} per month to reach your goal.
            </div>
            <div className="advice">
              <h3>Investment Suggestions:</h3>
              <ul>
                {suggestions.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RetirementPlanning;
