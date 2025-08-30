import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
const comments = [
  {
    user: "Anjali Sharma",
    text: "Dhansootra has been a game-changer for me. I was constantly overwhelmed by multiple loans and credit card dues, and I didn’t know where to start. The debt repayment strategies—especially the Avalanche method—gave me a clear plan to follow. What I love is how the platform breaks down complex concepts into simple, actionable steps. I could actually see my progress month by month, and it motivated me to stay consistent. I’ve already cleared two major debts and feel so much more in control of my finances. Thank you, Dhansootra!",
    time: "2 hours ago",
    avatar: "https://i.pravatar.cc/40?img=19"
  },
  {
    user: "Ravi Kumar",
    text: "As someone who often struggles to stick to a budget, Dhansootra’s expense tracker has been a lifesaver. The interface is clean, intuitive, and helps me categorize every little expense—from coffee runs to rent payments. I especially appreciate the monthly reports and savings tips that are tailored to my spending habits. The insights actually made me realize how much I was spending unnecessarily. Since using the tracker, I’ve saved over ₹5,000 in just two months and started building an emergency fund. Highly recommended for anyone who wants to take control of their daily expenses.",
    time: "5 hours ago",
    avatar: "https://i.pravatar.cc/40?img=33"
  },
  {
    user: "Pooja Mehta",
    text: "I used to think retirement planning was only for people in their 40s or 50s. But Dhansootra changed my perspective completely. The platform helped me set realistic financial goals based on my age, current income, and expected retirement age. The projections it gave were eye-opening. What stood out was the simplicity—no jargon, no overwhelming charts—just straight, practical advice. I now feel empowered about my financial future, even in my late 20s.",
    time: "1 day ago",
    avatar: "https://i.pravatar.cc/40?img=32"
  }
];

const Home = () => {
    const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  const redirectToNews = () => {
    window.location.href = 'https://finance.yahoo.com/?guccounter=1&guce_referrer=aHR0cHM6Ly9jaGF0Z3B0LmNvbS8&guce_referrer_sig=AQAAAMHu5LM7tLSwHDpVG0EMDkaC1TJt88oOeq6-UfPcoGuDCX0QJhGqt45k09pzAQgoxL80kdllhmW99GP2GISsC4IOR7dTmU-VbDPVK8rjzdmqXHrXFlM0QcGVOItjH1B7gYTaS0IhPmneBosebVK4AkAv8CljgtShOeaaNiCH2rYU'; // Replace with your desired URL
  };
  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="logo1.png" alt="Logo" />
        </div>
        <nav className="modules">
         <span onClick={() => handleNavigate('/debt-relief')}>Debt Relief Assistant</span>
          <span onClick={() => handleNavigate('/expense-tracker')}>Expense Tracker</span>
          <span onClick={() =>window.location.href = 'https://www.practicalmoneyskills.com/en'}>Financial Education</span>
          <span onClick={() => handleNavigate('/retirement-planning')}>Retirement Planning</span>
          <span onClick={() => handleNavigate('/profile')}>Profile</span>
        </nav>
      </header>
      
      {/* Main Section */}
      <main className="main-content">
        <div className="left-info">
        <h1 class="welcome-heading">
        Build wealth<br />like a boss.<br />Spend like a sage.
        </h1> 
          <p>Your trusted partner in managing expenses, planning retirement, and achieving financial freedom.</p>
        </div>
        <div className="main-image">
          <img src="p8.jpg" alt="Main Visual" />
        </div>
      </main>
      
      {/* Image Gallery Section */}
      <section className="image-gallery">
        <div className="image-layout">
          <div className="image-box large">
            <img src="p1.png" alt="Pic 1" />
            <p>Seamless digital transactions: Manage your credit cards and payments with ease on your mobile device.</p>
          </div>
          <div className="image-box small">
            <img src="p2.jpg" alt="Pic 2" />
            <p>Advanced financial analytics: Gain insights into your investments and track your financial growth.</p>
          </div>
          <div className="image-box medium">
            <img src="p4.png" alt="Pic 3" />
            <p>Smart financial management: Organize your expenses, plan budgets, and optimize savings efficiently.</p>
          </div>       
        </div>
      </section>

      <section className="info">
        <img src="p10.png" alt="Financial Insights" />
      </section> 

      <section className="financial-news-section">
      <h2 className="news-heading">Stay Updated with the Latest Financial News!</h2>
      <p className="news-description">
      Want to stay ahead of market moves? We’ve got you covered with timely updates, smart investment tips, and key financial trends—so you can grow your money with clarity and confidence.Get timely updates on market trends, investment strategies, and global financial shifts to keep your portfolio ahead of the curve.
      </p>
      <button className="news-button" onClick={redirectToNews}>
        Click Here for Latest News
      </button>
    </section>
      

      {/* New Image Section (Mailchimp-style Info Section) */}
      <section className="info-section">
        <img src="p12.png" alt="Financial Insights" />
      </section>  

      {/* Comment Section */}
      <section className="comment-section">
  <h2>The Buzz from Our Users</h2>
  <div className="comments-container">
    {comments.map((comment, index) => (
      <div key={index} className="comment">
        {/* Profile and Username */}
        <div className="comment-header">
          <img
            src={comment.avatar || "/default-avatar.png"} // fallback image
            alt="User Avatar"
            className="avatar"
          />
          <div>
            <h3>{comment.user}</h3>
            <small>{comment.time}</small>
          </div>
        </div>

        {/* Stars */}
        <div className="stars">★★★★★</div>

        {/* Comment Text */}
        <p className="comment-text">"{comment.text}"</p>
      </div>
    ))}
  </div>
</section>

      <section className="end-img">
        <img src="p15.png" alt="ending" />
      </section> 
    </div>
    
  );
};

export default Home;
