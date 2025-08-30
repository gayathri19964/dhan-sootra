 import React, { useState, useEffect } from 'react'; // ✅ import useEffect 
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Assuming shared CSS

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // ✅ Add this effect to apply background image only for this page
  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
      setMessage('❌ Email already registered!');
      return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('✅ Registered successfully! Redirecting...');

    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="login-container">
      <section className="register-form-section">
        <form className="register-form" onSubmit={handleRegister}>
          <button type="button" className="close-button" onClick={() => navigate('/')}><h4>x</h4></button>
          <h2>Register</h2>

          <label>Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

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

          <button type="submit">Register</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;