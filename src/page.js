import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="logo">Your Logo</div>
        <nav className="modules">
          <span>Debt Relief Assistant</span>
          <span>Expense Tracker</span>
          <span>Financial Education</span>
          <span>Retirement Planning</span>
          <span>Profile</span>
        </nav>
      </header>
      
      {/* Main Section */}
      <main className="main-content">
        <div className="left-info">
          <h2>Welcome to Our Financial Platform</h2>
          <p>Your trusted partner in managing expenses, planning retirement, and achieving financial freedom.</p>
        </div>
        <div className="main-image">
          <img src="your-uploaded-image.jpg" alt="Main Visual" />
        </div>
      </main>
      
      {/* Image Gallery Section */}
      <section className="image-gallery">
        <div className="image-box">
          <img src="your-image1.jpg" alt="Pic 1" />
          <p>Description of Pic 1</p>
        </div>
        <div className="image-box">
          <img src="your-image2.jpg" alt="Pic 2" />
          <p>Description of Pic 2</p>
        </div>
        <div className="image-box">
          <img src="your-image3.jpg" alt="Pic 3" />
          <p>Description of Pic 3</p>
        </div>
        <div className="image-box">
          <img src="your-image4.jpg" alt="Pic 4" />
          <p>Description of Pic 4</p>
        </div>
        <div className="image-box">
          <img src="your-image5.jpg" alt="Pic 5" />
          <p>Description of Pic 5</p>
        </div>
      </section>
    </div>
  );
};

export default App;
