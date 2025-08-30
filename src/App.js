// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import MainPage from './MainPage'; // Default landing page
import Home from './Home';
import DebtReliefAssistant from './DebtReliefAssistant';
import ExpenseTracker from './ExpenseTracker';
import FinancialEducation from './FinancialEducation';
import RetirementPlanning from './RetirementPlanning';
import Profile from './Profile';
import RegisterPage from './RegisterPage'; // Correct file name
import LoginPage from './LoginPage'; // Corrected from LoginPopup to LoginPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/debt-relief" element={<DebtReliefAssistant />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/financial-education" element={<FinancialEducation />} />
        <Route path="/retirement-planning" element={<RetirementPlanning />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
