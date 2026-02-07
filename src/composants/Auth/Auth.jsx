import React, { useState } from "react";
import "./Auth.css";
import { FaGoogle } from "react-icons/fa";

function Auth({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: formData.email,
      name: formData.name || formData.email.split("@")[0],
      isPremium: false
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("userLogin"));
    onLogin(user);
    onClose();
  };

  const handleGoogleLogin = () => {
    const user = {
      email: "user@gmail.com",
      name: "Google User",
      isPremium: false,
      provider: "google"
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("userLogin"));
    onLogin(user);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✕</button>
        
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        
        <button className="google-btn" onClick={handleGoogleLogin}>
          <FaGoogle /> Continue with Google
        </button>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        
        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
