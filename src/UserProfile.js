import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
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

  return (
    <div className="profile-card">
      <div className="left-section">
        <div className="profile-photo"></div>
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
          <input type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} />
          <input type="text" name="status" placeholder="Status" value={user.status} onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" value={user.location} onChange={handleChange} />
          <input type="text" name="type" placeholder="User Type" value={user.type} onChange={handleChange} />
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
          <input type="range" name="risk" min="0" max="100" value={user.personality.risk} onChange={handleSlider} />

          <label>Long-Term Planner: {user.personality.planner}</label>
          <input type="range" name="planner" min="0" max="100" value={user.personality.planner} onChange={handleSlider} />

          <label>Finding Trustworthy: {user.personality.trust}</label>
          <input type="range" name="trust" min="0" max="100" value={user.personality.trust} onChange={handleSlider} />
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

        <div className="brands">
          <input
            type="text"
            placeholder="Favourite Brand 1"
            value={user.brands[0]}
            onChange={(e) =>
              setUser({ ...user, brands: [e.target.value, user.brands[1], user.brands[2]] })
            }
          />
          <input
            type="text"
            placeholder="Brand 2"
            value={user.brands[1]}
            onChange={(e) =>
              setUser({ ...user, brands: [user.brands[0], e.target.value, user.brands[2]] })
            }
          />
          <input
            type="text"
            placeholder="Brand 3"
            value={user.brands[2]}
            onChange={(e) =>
              setUser({ ...user, brands: [user.brands[0], user.brands[1], e.target.value] })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;