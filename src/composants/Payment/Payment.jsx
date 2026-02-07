import React, { useState } from "react";
import "./Payment.css";

function Payment({ onClose, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [cryptoData, setCryptoData] = useState({
    wallet: "",
    amount: "",
    balance: 1000
  });
  const [alert, setAlert] = useState(null);

  const handleCryptoPayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(cryptoData.amount);
    
    if (amount > cryptoData.balance) {
      setAlert({ type: "error", message: "Insufficient balance! Please add funds to your wallet." });
      return;
    }
    
    if (amount < 9.99) {
      setAlert({ type: "error", message: "Minimum payment is $9.99" });
      return;
    }
    
    setAlert({ type: "success", message: "Payment successful! You now have premium access." });
    
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.isPremium = true;
      localStorage.setItem("user", JSON.stringify(user));
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose}>✕</button>
        
        <h2>Premium Subscription</h2>
        <p className="payment-price">$9.99/month</p>
        
        <div className="payment-methods">
          <button
            className={`method-btn ${paymentMethod === "crypto" ? "active" : ""}`}
            onClick={() => setPaymentMethod("crypto")}
          >
            Cryptocurrency
          </button>
          <button
            className={`method-btn ${paymentMethod === "bank" ? "active" : ""}`}
            onClick={() => setPaymentMethod("bank")}
          >
            Bank Transfer
          </button>
        </div>
        
        {alert && (
          <div className={`payment-alert ${alert.type}`}>
            {alert.message}
          </div>
        )}
        
        {paymentMethod === "crypto" && (
          <form onSubmit={handleCryptoPayment}>
            <div className="balance-info">
              Current Balance: ${cryptoData.balance.toFixed(2)}
            </div>
            
            <input
              type="text"
              placeholder="Wallet Address"
              value={cryptoData.wallet}
              onChange={(e) => setCryptoData({ ...cryptoData, wallet: e.target.value })}
              required
            />
            
            <input
              type="number"
              step="0.01"
              placeholder="Amount (USD)"
              value={cryptoData.amount}
              onChange={(e) => setCryptoData({ ...cryptoData, amount: e.target.value })}
              required
            />
            
            <button type="submit" className="payment-btn">Pay Now</button>
          </form>
        )}
        
        {paymentMethod === "bank" && (
          <div className="coming-soon">
            <h3>Coming Soon</h3>
            <p>Bank transfer payment option will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
