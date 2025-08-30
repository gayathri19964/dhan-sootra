// client/src/components/UserForm.js

import React, { useState } from 'react';

function UserForm() {
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');
  const [cityTier, setCityTier] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      income,
      age,
      city_tier: cityTier,
      occupation,
    };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      alert(result.message);  // Show success message
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Error saving user data');
    }
  };

  return (
    <div>
      <h2>Enter User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Income:
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          City Tier:
          <input
            type="text"
            value={cityTier}
            onChange={(e) => setCityTier(e.target.value)}
            required
          />
        </label>
        <label>
          Occupation:
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save User</button>
      </form>
    </div>
  );
}

export default UserForm;
