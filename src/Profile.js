import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    role: "",
    quote: "",
    age: "",
    status: "",
    location: "",
    type: "",
    bio: "",
    tags: [],
    goals: ["", ""],
    brands: ["", "", ""],
    personality: {
      risk: 50,
      planner: 50,
      trust: 50,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlider = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      personality: { ...prev.personality, [name]: Number(value) },
    }));
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Header with logo and navigation */}
      <header className="header">
        <div className="logo">
          <img src="logo1.png" alt="Logo" />
        </div>
        <nav className="modules">
          <span onClick={() => handleNavigate("/debt-relief")}>Debt Relief Assistant</span>
          <span onClick={() => handleNavigate("/expense-tracker")}>Expense Tracker</span>
          <span onClick={() => (window.location.href = "https://www.practicalmoneyskills.com/en")}>
            Financial Education
          </span>
          <span onClick={() => handleNavigate("/retirement-planning")}>Retirement Planning</span>
          <span onClick={() => handleNavigate("/profile")}>Profile</span>
        </nav>
      </header>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="left-section">
          <div
            className="profile-photo"
            style={{
              backgroundImage: 'url("profile1.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Occupation"
            value={user.role}
            onChange={handleChange}
          />
          <input
            type="text"
            name="quote"
            placeholder="Short Quote"
            value={user.quote}
            onChange={handleChange}
          />
          <div className="info-box">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={user.age}
              onChange={handleChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={user.status}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={user.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="type"
              placeholder="User Type"
              value={user.type}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="right-section">
          <textarea
            name="bio"
            placeholder="User Bio..."
            value={user.bio}
            onChange={handleChange}
          />

          <div className="sliders">
            <label>Risk-Tolerant: {user.personality.risk}</label>
            <input
              type="range"
              name="risk"
              min="0"
              max="100"
              value={user.personality.risk}
              onChange={handleSlider}
            />

            <label>Long-Term Planner: {user.personality.planner}</label>
            <input
              type="range"
              name="planner"
              min="0"
              max="100"
              value={user.personality.planner}
              onChange={handleSlider}
            />

            <label>Finding Trustworthy: {user.personality.trust}</label>
            <input
              type="range"
              name="trust"
              min="0"
              max="100"
              value={user.personality.trust}
              onChange={handleSlider}
            />
          </div>

          <div className="goals">
            <input
              type="text"
              placeholder="Goal 1"
              value={user.goals[0]}
              onChange={(e) =>
                setUser({ ...user, goals: [e.target.value, user.goals[1]] })
              }
            />
            <input
              type="text"
              placeholder="Goal 2"
              value={user.goals[1]}
              onChange={(e) =>
                setUser({ ...user, goals: [user.goals[0], e.target.value] })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
