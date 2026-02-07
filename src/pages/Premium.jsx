import React, { useState, useEffect } from "react";
import Payment from "../composants/Payment/Payment";
import Footer from "../composants/footer/footer";
import "./Premium.css";

function Premium() {
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handlePaymentSuccess = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  };

  return (
    <>
      <div className="premium-page">
        <div className="premium-hero">
          <h1>Premium Membership</h1>
          <p>Unlock unlimited access to movies and TV shows</p>
        </div>

        {user?.isPremium ? (
          <div className="premium-content">
            <div className="premium-status">
              <h2>✓ You have Premium Access</h2>
              <p>Enjoy unlimited streaming!</p>
            </div>

            <div className="premium-actions">
              <button className="action-btn watch">
                <span>▶</span> Watch Online
              </button>
              <button className="action-btn download">
                <span>⬇</span> Download
              </button>
            </div>

            <div className="premium-features">
              <h3>Your Benefits:</h3>
              <ul>
                <li>✓ Unlimited streaming</li>
                <li>✓ Download for offline viewing</li>
                <li>✓ Ad-free experience</li>
                <li>✓ HD & 4K quality</li>
                <li>✓ Watch on any device</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="premium-content">
            <div className="premium-plans">
              <div className="plan-card">
                <h3>Premium Plan</h3>
                <div className="plan-price">$9.99<span>/month</span></div>
                <ul>
                  <li>Unlimited streaming</li>
                  <li>Download movies</li>
                  <li>Ad-free experience</li>
                  <li>HD & 4K quality</li>
                </ul>
                <button className="subscribe-btn" onClick={() => setShowPayment(true)}>
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPayment && (
        <Payment
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <Footer />
    </>
  );
}

export default Premium;
