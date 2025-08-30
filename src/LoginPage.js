import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Send login request to backend
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <header className="black-header">
        <div className="header-logo">{/* Optional Logo */}</div>
      </header>

      <section className="login-form-section">
        <form className="login-form" onSubmit={handleLogin}>
          <button
            type="button"
            className="close-button"
            onClick={() => navigate("/")}
          >
            <h4>x</h4>
          </button>
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
