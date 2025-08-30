import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mainpage-container">
      {/* BLACK HEADER */}
      <header className="header">
        <div className="logo">
          <img src="logo1.png" alt="Logo" />
        </div>
        <div className="header-buttons">
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </header>

      {/* FIRST CENTERED IMAGE */}
      <section className="centered-image-section">
        <img src="m15.png" alt="Main Banner" className="centered-image" />
      </section>

      {/* IMAGE LEFT + INFO RIGHT */}
      <div className="info-container">
        <section className="split-section">
          <div className="split-image">
            <img src="m11.jpg" alt="Side Visual" />
          </div>
          <div className="split-info">
            <h2>Your Financial Companion</h2>
            <p>
              Dhansootra empowers you with the tools and insights you need to master
              your finances. From smart debt repayment plans to personalized expense
              tracking and retirement strategies, we’re here to help you grow wealth.
            </p>
            <p>
              Let Dhansootra be your trusted partner in achieving long-term financial wellness. It's not just about numbers; 
              it's about building a future of freedom, growth, and stability.
            </p>
          </div>
        </section>
      </div>

      {/* SECOND CENTERED IMAGE */}
      <section className="centered-image-section">
        <img src="m3.png" alt="Secondary Visual" className="centered-image" />
      </section>

      {/* EXTRA IMAGES */}
      <section className="extra-images">
        <div className="center-image">
          <img src="m13.png" alt="Middle Visual" />
        </div>
        <div className="bottom-image">
          <img src="m14.png" alt="Bottom Visual" />
        </div>
        <div className="bottom-image">
          <img src="p15.png" alt="Bottom Visual" />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
